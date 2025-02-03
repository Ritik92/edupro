"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { BookOpen, Clock, Target, Rocket, GraduationCap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Chapter {
  id: number;
  title: string;
  contentSummary: string;
  sequenceOrder: number;
  progress?: number;
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-indigo-50 to-white">
        <Alert className="max-w-lg bg-white shadow-xl border border-indigo-100">
          <AlertTitle className="flex items-center gap-2 text-indigo-600">
            <Sparkles className="h-5 w-5" />
            Oops! Something went wrong
          </AlertTitle>
          <AlertDescription className="mt-2 text-gray-600">
            {error}. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 inline-block bg-indigo-100 px-6 py-2 rounded-full">
              <span className="text-indigo-600 font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Start Learning
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Course Chapters
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Master each chapter with interactive content, quizzes, and hands-on projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <AnimatePresence>
              {chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => router.push(`/courses/${courseId}/chapters/${chapter.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                        Chapter {chapter.sequenceOrder}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {chapter.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {chapter.contentSummary}
                    </p>

                    {/* Progress Bar */}
                    {chapter.progress && (
                      <div className="mb-6">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${chapter.progress}%` }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          />
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {chapter.progress}% Complete
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-indigo-600" />
                          <span>15 mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-600" />
                          <span>Beginner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}