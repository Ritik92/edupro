import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyA7oDWWo7lkxyA6RKqmPYQeoaiCeGr2l24');

function cleanJsonResponse(text) {
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  cleaned = cleaned.trim();
  
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace > 0) {
    cleaned = cleaned.slice(firstBrace);
  }
  
  const lastBrace = cleaned.lastIndexOf('}');
  if (lastBrace !== -1 && lastBrace < cleaned.length - 1) {
    cleaned = cleaned.slice(0, lastBrace + 1);
  }

  // Fix any malformed timestamps
  cleaned = cleaned.replace(/T\s+T/g, 'T');
  
  return cleaned;
}

function mergeWithOriginal(original, regenerated) {
  // Helper function to merge while preserving specific fields
  const merge = (orig, regen) => {
    if (!orig || !regen) return regen || orig;
    
    // If it's an array of videos, preserve the original completely
    if (Array.isArray(orig) && orig.length > 0 && orig[0].videoUrl) {
      return orig;
    }
    
    // For other arrays, keep the regenerated content
    if (Array.isArray(orig)) {
      return regen;
    }
    
    if (typeof orig === 'object') {
      const merged = { ...regen };
      for (const key in orig) {
        // Preserve IDs, dates, and structural fields
        if (
          key === 'id' || 
          key === 'createdAt' || 
          key === 'updatedAt' ||
          key === 'videoUrl' ||
          key === 'chapterId' ||
          key === 'courseId'
        ) {
          merged[key] = orig[key];
        } else {
          merged[key] = merge(orig[key], regen[key]);
        }
      }
      return merged;
    }
    
    return regen;
  };
  
  return merge(original, regenerated);
}

export async function POST(req) {
  try {
    const { originalContent, quizScore, attemptNumber } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an adaptive learning system. A student has completed a quiz with a score of ${quizScore}% on attempt #${attemptNumber}.
      
      Here is the original chapter content that you should modify while keeping the same structure:
      ${JSON.stringify(originalContent)}
      
      Instructions:
      1. Generate a modified version based on the quiz score of ${quizScore}%.
      2. If the score is below 70%, provide simpler explanations with more examples.
      3. Keep the same overall structure but modify the content to be more accessible.
      4. Do not change any videoUrl values or structural IDs.
      5. You can modify:
         - Section content and explanations
         - Quiz questions and answers
         - Exercise instructions
         - Content summaries
      6. The response must be valid JSON matching the original structure.
      
      Important: Return ONLY the JSON object with no additional text or formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedResponse = cleanJsonResponse(response.text());
    
    try {
      let regeneratedContent = JSON.parse(cleanedResponse);
      
      // Merge regenerated content with original, preserving critical fields
      const mergedContent = mergeWithOriginal(originalContent, regeneratedContent);

      // Basic structure validation
      const validateBasicStructure = (content) => {
        return content &&
          content.id &&
          content.title &&
          content.content?.sections &&
          Array.isArray(content.content.sections) &&
          content.content.resources &&
          Array.isArray(content.content.resources) &&
          content.videos &&
          Array.isArray(content.videos) &&
          content.quiz;
      };

      if (!validateBasicStructure(mergedContent)) {
        throw new Error('Basic structure validation failed');
      }

      console.log('Content successfully regenerated and merged');
      
      return Response.json(mergedContent);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return Response.json(
        { 
          error: 'Failed to process content',
          details: parseError.message
        }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json(
      { 
        error: 'Failed to regenerate content',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}