import { NextResponse } from 'next/server';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { AssemblyAI } from 'assemblyai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const aai = new AssemblyAI({
  apiKey: 'ae35ea53fa954ced9fc6ae8ae4f61a56',
});

const genAI = new GoogleGenerativeAI('AIzaSyA7oDWWo7lkxyA6RKqmPYQeoaiCeGr2l24');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define your available routes and their descriptions
const AVAILABLE_ROUTES = {
  '/': 'home page, main page, landing page',
  '/about': 'about page, about us, who we are',
  '/courses': 'courses page,  available courses, all courses',
  '/products': 'products page, our products, items',
  '/auth/signin': 'sign in page, login page, log in',
  // Add more routes as needed
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('audio');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // @ts-ignore
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = join(tmpdir(), `command-${Date.now()}.wav`);
    fs.writeFileSync(tempFilePath, buffer);

    // Transcribe audio
    const transcript = await aai.transcripts.transcribe({
      audio: tempFilePath,
    });
    const transcriptionText = transcript.text as string;

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    // Generate prompt for route matching
    const routesDescription = Object.entries(AVAILABLE_ROUTES)
      .map(([route, desc]) => `${route}: ${desc}`)
      .join('\n');

    const prompt = `Given the following website routes and their descriptions:
${routesDescription}

And the user's voice command: "${transcriptionText}"

Return only the most appropriate route path (e.g. "/about") based on the command. If no route matches, return "none".`;

    // Get route from Gemini
    const result = await model.generateContent(prompt);
    const suggestedRoute = result.response.text().trim();

    // Validate the route exists
    if (suggestedRoute === 'none' || !AVAILABLE_ROUTES[suggestedRoute]) {
      return NextResponse.json({
        transcription: transcriptionText,
        route: null,
        message: 'No matching route found'
      });
    }

    return NextResponse.json({
      transcription: transcriptionText,
      route: suggestedRoute
    });

  } catch (error) {
    console.error('Error processing voice command:', error);
    return NextResponse.json(
      { message: 'Error processing voice command' },
      { status: 500 }
    );
  }
}