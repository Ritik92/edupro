"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, X, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Award, Sparkles, Clock, Target } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';

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

interface Chapter {
  id: number;
  title: string;
  contentSummary: string;
  sequenceOrder: number;
  quiz: Quiz | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function CourseChapters() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<{ correct: number; total: number } | null>(null);
  const [progress, setProgress] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/chapters`);
        setChapters(response.data.sort((a: Chapter, b: Chapter) => a.sequenceOrder - b.sequenceOrder));
      } catch (err) {
        setError('Failed to fetch chapters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizResults(null);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedChapter?.quiz) return;
    
    const isCorrect = selectedAnswer === selectedChapter.quiz.questions[currentQuestionIndex].correctAnswer;
    setProgress(prev => ({
      ...prev,
      [currentQuestionIndex]: isCorrect
    }));

    if (currentQuestionIndex < selectedChapter.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const correctAnswers = Object.values(progress).filter(Boolean).length;
      setQuizResults({
        correct: correctAnswers,
        total: selectedChapter.quiz.questions.length
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
     
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
      
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Alert variant="destructive" className="max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
     
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Course
            <span className="text-primary"> Chapters</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master each chapter at your own pace and test your knowledge with interactive quizzes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {chapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="group relative bg-card hover:bg-accent rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedChapter(chapter)}
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                    Chapter {chapter.sequenceOrder}
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 text-card-foreground">{chapter.title}</h2>
                  <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-4">
                    {chapter.contentSummary}
                  </p>

                  {chapter.quiz && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Award className="h-4 w-4" />
                      <span>Interactive Quiz Available</span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-border">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chapter Modal */}
      <AnimatePresence>
        {selectedChapter && !quizMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-lg"
            >
              <div className="sticky top-0 bg-card p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Chapter {selectedChapter.sequenceOrder}</p>
                    <h2 className="text-2xl font-bold text-card-foreground">
                      {selectedChapter.title}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedChapter(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-card-foreground whitespace-pre-line">{selectedChapter.contentSummary}</p>
                </div>

                {selectedChapter.quiz && (
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button
                      onClick={startQuiz}
                      className="w-full"
                      size="lg"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Start Quiz
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {selectedChapter && quizMode && selectedChapter.quiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-xl max-w-3xl w-full shadow-lg"
            >
              <div className="p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {selectedChapter.quiz.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setQuizMode(false);
                      setQuizResults(null);
                      setProgress({});
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {!quizResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Question {currentQuestionIndex + 1} of {selectedChapter.quiz.questions.length}</span>
                        <span>{Math.round(((currentQuestionIndex + 1) / selectedChapter.quiz.questions.length) * 100)}% Complete</span>
                      </div>
                      <Progress 
                        value={((currentQuestionIndex + 1) / selectedChapter.quiz.questions.length) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="mb-8">
                      <p className="text-lg font-medium mb-6 text-card-foreground">
                        {selectedChapter.quiz.questions[currentQuestionIndex].questionText}
                      </p>
                      <div className="space-y-3">
                        {[
                          selectedChapter.quiz.questions[currentQuestionIndex].option1,
                          selectedChapter.quiz.questions[currentQuestionIndex].option2,
                          selectedChapter.quiz.questions[currentQuestionIndex].option3,
                          selectedChapter.quiz.questions[currentQuestionIndex].option4,
                        ].map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                              selectedAnswer === option
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50 text-card-foreground'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          if (currentQuestionIndex > 0) {
                            setCurrentQuestionIndex(prev => prev - 1);
                            setSelectedAnswer(null);
                          }
                        }}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Previous
                      </Button>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!selectedAnswer}
                      >
                        {currentQuestionIndex === selectedChapter.quiz.questions.length - 1 ? 'Finish' : 'Next'}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      {quizResults.correct / quizResults.total >= 0.7 ? (
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Award className="h-10 w-10 text-primary" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <Target className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      <h4 className="text-2xl font-bold mb-2 text-card-foreground">Quiz Completed!</h4>
                      <p className="text-muted-foreground">
                        You got {quizResults.correct} out of {quizResults.total} questions correct
                      </p>
                    </motion.div>
                    
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setQuizMode(false);
                          setQuizResults(null);
                          setProgress({});
                        }}
                      >
                        Close Quiz
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setSelectedAnswer(null);
                          setQuizResults(null);
                          setProgress({});
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}