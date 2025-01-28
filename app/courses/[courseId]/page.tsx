'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ArrowRight, BookOpen, X, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-52"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Course Chapters</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
            onClick={() => setSelectedChapter(chapter)}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Chapter {chapter.sequenceOrder}
              </span>
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{chapter.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-3">{chapter.contentSummary}</p>
            {chapter.quiz && (
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <Award className="h-4 w-4 mr-2" />
                <span>Includes Quiz</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chapter Modal */}
      {selectedChapter && !quizMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Chapter {selectedChapter.sequenceOrder}: {selectedChapter.title}
                </h2>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{selectedChapter.contentSummary}</p>
              </div>

              {selectedChapter.quiz && (
                <div className="mt-8">
                  <button
                    onClick={startQuiz}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Start Quiz
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {selectedChapter && quizMode && selectedChapter.quiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedChapter.quiz.title}
                </h3>
                <button
                  onClick={() => {
                    setQuizMode(false);
                    setQuizResults(null);
                    setProgress({});
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!quizResults ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Question {currentQuestionIndex + 1} of {selectedChapter.quiz.questions.length}</span>
                      <span>{Math.round(((currentQuestionIndex + 1) / selectedChapter.quiz.questions.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / selectedChapter.quiz.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-lg font-medium mb-6">
                      {selectedChapter.quiz.questions[currentQuestionIndex].questionText}
                    </p>
                    <div className="space-y-3">
                      {[
                        selectedChapter.quiz.questions[currentQuestionIndex].option1,
                        selectedChapter.quiz.questions[currentQuestionIndex].option2,
                        selectedChapter.quiz.questions[currentQuestionIndex].option3,
                        selectedChapter.quiz.questions[currentQuestionIndex].option4,
                      ].map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedAnswer === option
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        if (currentQuestionIndex > 0) {
                          setCurrentQuestionIndex(prev => prev - 1);
                          setSelectedAnswer(null);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        currentQuestionIndex === 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswer}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg ${
                        selectedAnswer
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentQuestionIndex === selectedChapter.quiz.questions.length - 1 ? 'Finish' : 'Next'}
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Quiz Completed!</h4>
                    <p className="text-gray-600">
                      You got {quizResults.correct} out of {quizResults.total} questions correct
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setQuizMode(false);
                        setQuizResults(null);
                        setProgress({});
                      }}
                      className="w-full bg-gray-100 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Close Quiz
                    </button>
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedAnswer(null);
                        setQuizResults(null);
                        setProgress({});
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}