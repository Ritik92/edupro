"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { BookOpen, Clock, Target } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Chapter {
  id: number;
  title: string;
  contentSummary: string;
  sequenceOrder: number;
}

export default function CourseChapters() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/chapters`);
        setChapters(response.data.sort((a: Chapter, b: Chapter) => 
          a.sequenceOrder - b.sequenceOrder
        ));
      } catch (err) {
        setError('Failed to fetch chapters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Course <span className="text-primary">Chapters</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Master each chapter at your own pace with interactive content and quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => router.push(`/courses/${courseId}/chapters/${chapter.id}`)}
            className="group bg-card hover:bg-accent rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                Chapter {chapter.sequenceOrder}
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-3">{chapter.title}</h2>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {chapter.contentSummary}
            </p>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>15 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Beginner</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}