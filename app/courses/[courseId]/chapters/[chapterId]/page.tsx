"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { 
  BookOpen, 
  Video, 
  Code, 
  FileText, 
  Link as LinkIcon, 
  List,
  Download,
  Clock,
  Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContentSection {
  title: string;
  type: 'text' | 'video' | 'code' | 'list' | 'exercise';
  content?: string;
  items?: string[];
  language?: string;
  instructions?: string;
  starterCode?: string;
  solution?: string;
}

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface Video {
  id: number;
  title: string;
  language: string;
  videoUrl: string;
  chapterId: number;
  createdAt: string;
  updatedAt: string;
}

interface ChapterContent {
  sections: ContentSection[];
  resources: Resource[];
}

interface Chapter {
  id: number;
  title: string;
  content: ChapterContent;
  contentSummary: string;
  videos: Video[];
  sequenceOrder: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  quiz:Quiz|null
}
interface Question {
    id: number;
    questionText: string;
    correctAnswer: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  }
  
  interface Quiz {
    id: number;
    title: string;
    questions: Question[];
  }
const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
    <code className={`language-${language}`}>{code}</code>
  </pre>
);

export default function ChapterContent() {
  const params = useParams();
  const chapterId = params.chapterId as string;
  const courseId = params.courseId;
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [showQuiz, setShowQuiz] = useState(false);
const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
const [quizSubmitted, setQuizSubmitted] = useState(false);
const [score, setScore] = useState(0);
const handleQuizSubmit = () => {
    if (!chapter?.quiz) return;
    
    let correctCount = 0;
    chapter.quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore((correctCount / chapter.quiz.questions.length) * 100);
    setQuizSubmitted(true);
  };

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}`);
        setChapter(response.data);
      } catch (err) {
        setError('Failed to fetch chapter content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [chapterId, courseId]);

  const getCurrentVideo = () => {
    if (!chapter?.videos) return null;
    return chapter.videos.find(video => video.language === selectedLanguage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!chapter) return null;

  const renderContentSection = (section: ContentSection) => {
    switch (section.type) {
      case 'text':
        return (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {section.content}
              </div>
            </CardContent>
          </Card>
        );

      case 'video':
        const currentVideo = getCurrentVideo();
        return (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <CardTitle>{currentVideo?.title || "Video Content"}</CardTitle>
                </div>
                {chapter.videos.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          {selectedLanguage === 'en' ? 'English' : 'हिंदी'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {chapter.videos.length > 0 ? (
                <>
                  <div className="aspect-video bg-muted rounded-lg mb-4">
                    {currentVideo ? (
                      <video
                        className="w-full h-full rounded-lg"
                        controls
                        src={currentVideo.videoUrl}
                        poster="/api/placeholder/640/360"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Video not available in selected language</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{currentVideo?.title}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">No video content available</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'code':
        return (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock code={section.content || ''} language={section.language || 'javascript'} />
            </CardContent>
          </Card>
        );

      case 'list':
        return (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {section.items?.map((item, index) => (
                  <li key={index} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );

      case 'exercise':
        return (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <p className="text-muted-foreground">{section.instructions}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Starter Code</h4>
                  <CodeBlock 
                    code={section.starterCode || ''} 
                    language={section.language || 'javascript'} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
        <p className="text-muted-foreground">{chapter.contentSummary}</p>
      </div>

      {/* Render videos section if videos are available */}
      {chapter.videos && chapter.videos.length > 0 && (
        <div className="mb-6">
          {renderContentSection({ type: 'video', title: "Video Content" })}
        </div>
      )}

      <div className="mb-12">
        {chapter.content.sections.map((section, index) => (
          <div key={index}>
            {renderContentSection(section)}
          </div>
        ))}
      </div>
      {chapter.quiz && (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>{chapter.quiz.title}</CardTitle>
        </div>
        {!showQuiz && (
          <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
        )}
      </div>
    </CardHeader>
    {showQuiz && (
      <CardContent>
        <div className="space-y-6">
          {chapter.quiz.questions.map((question) => (
            <div key={question.id} className="space-y-4">
              <h3 className="font-medium">{question.questionText}</h3>
              <RadioGroup
                onValueChange={(value) => 
                  setSelectedAnswers(prev => ({...prev, [question.id]: value}))
                }
                value={selectedAnswers[question.id]}
              >
                {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option}
                      id={`q${question.id}-${index}`}
                      disabled={quizSubmitted}
                    />
                    <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          {!quizSubmitted ? (
            <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
          ) : (
            <Alert className={score >= 70 ? "bg-green-100" : "bg-red-100"}>
              <AlertTitle>Quiz Results</AlertTitle>
              <AlertDescription>
                You scored {score}%. {score >= 70 ? 'Congratulations!' : 'Try again!'}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    )}
  </Card>
)}
      {chapter.content.resources && chapter.content.resources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {chapter.content.resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  {resource.type === 'link' ? (
                    <LinkIcon className="h-5 w-5 text-primary" />
                  ) : (
                    <Download className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {resource.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}