"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Video, BookOpen, Brain, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

// Define TypeScript types based on your schema
interface Chapter {
  id: number;
  title: string;
  content: any;
  contentSummary: string | null;
  sequenceOrder: number;
  xpReward: number;
  videos: Video[];
  quiz: Quiz | null;
  userProgress: UserProgress[];
}

interface Video {
  id: number;
  title: string;
  language: string;
  videoUrl: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  xpReward: number;
  minPassScore: number;
}

interface Question {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface UserProgress {
  completed: boolean;
  lastAccessed: Date;
}

export const ChapterView = (chapterId:any,courseId:any) => {
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentSection, setCurrentSection] = useState<'content' | 'video' | 'quiz'>('content');

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`/api/courses${courseId}/chapters/${chapterId}`);
        const data = await response.json();
        setChapter(data);
      } catch (error) {
        toast.error('Failed to fetch chapter');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const progressPercentage = chapter.userProgress[0]?.completed ? 100 : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary">{chapter.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-lg font-semibold">
              +{chapter.xpReward} XP
            </div>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
        <p className="text-muted-foreground">{chapter.contentSummary}</p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setCurrentSection('content')}
          className={`pb-2 px-4 ${currentSection === 'content' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Content</span>
          </div>
        </button>
        <button
          onClick={() => setCurrentSection('video')}
          className={`pb-2 px-4 ${currentSection === 'video' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
        >
          <div className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Videos</span>
          </div>
        </button>
        <button
          onClick={() => setCurrentSection('quiz')}
          className={`pb-2 px-4 ${currentSection === 'quiz' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
        >
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Quiz</span>
          </div>
        </button>
      </div>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {currentSection === 'content' && (
          <Card>
            <CardContent className="prose prose-lg max-w-none p-6">
              {/* Render your content here based on the content JSON structure */}
              <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </CardContent>
          </Card>
        )}

        {currentSection === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapter.videos.map((video) => (
              <Card key={video.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5 text-primary" />
                    <span>{video.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-black">
                    {/* Replace with your video player component */}
                    <video
                      src={video.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'quiz' && chapter.quiz && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span>{chapter.quiz.title}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  Passing Score: {chapter.quiz.minPassScore}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {chapter.quiz.questions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {question.questionText}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[question.option1, question.option2, question.option3, question.option4].map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Submit Quiz
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

