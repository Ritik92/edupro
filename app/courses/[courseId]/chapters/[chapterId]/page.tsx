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
  Globe,
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import confetti from 'canvas-confetti';

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
  const AchievementBadge = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`flex items-center gap-2 p-3 rounded-lg ${color} bg-opacity-20 backdrop-blur-sm`}
    >
      {icon}
      <span className="font-medium">{title}</span>
    </motion.div>
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
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [achievements, setAchievements] = useState<string[]>([]);
    const [completedSections, setCompletedSections] = useState<number[]>([]);
    const [dailyStreak, setDailyStreak] = useState(0);
  
    // Game mechanics
    const addXp = (amount: number) => {
      setXp(prev => {
        const newXp = prev + amount;
        if (newXp >= level * 100) {
          setLevel(prevLevel => {
            const newLevel = prevLevel + 1;
            confetti({ particleCount: 100, spread: 70 });
            setAchievements(prev => [...prev, `Reached Level ${newLevel}`]);
            return newLevel;
          });
        }
        return newXp;
      });
    };
  
    const handleSectionComplete = (index: number) => {
      if (!completedSections.includes(index)) {
        setCompletedSections(prev => [...prev, index]);
        addXp(50);
        setDailyStreak(prev => prev + 1);
        if (dailyStreak % 3 === 0) {
          addXp(100);
          setAchievements(prev => [...prev, `${dailyStreak + 1} Day Streak!`]);
        }
      }
    };
  
    const handleQuizSubmit = () => {
      if (!chapter?.quiz) return;
      
      let correctCount = 0;
      chapter.quiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      
      const newScore = (correctCount / chapter.quiz.questions.length) * 100;
      setScore(newScore);
      setQuizSubmitted(true);
      addXp(correctCount * 20);
      
      if (newScore === 100) {
        setAchievements(prev => [...prev, 'Perfect Score!']);
        confetti({ particleCount: 200, spread: 100 });
      }
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
  const renderContentSection = (section: ContentSection, index: number) => {
    const isCompleted = completedSections.includes(index);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="mb-6 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500"
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => handleSectionComplete(index)}
                    className="p-1 hover:bg-accent rounded-full"
                  >
                    <div className="w-5 h-5 border-2 border-primary rounded-full" />
                  </button>
                )}
                <CardTitle>{section.title}</CardTitle>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  +50 XP
                  <Zap className="h-4 w-4 fill-current" />
                </div>
              )}
            </div>
          </CardHeader>
          {/* Keep existing section rendering logic */}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{chapter?.title}</h1>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span>Level {level}</span>
              <span className="mx-2">•</span>
              <Zap className="h-5 w-5" />
              <span>{xp} XP</span>
              <span className="mx-2">•</span>
              <span>🔥 {dailyStreak} Day Streak</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold mb-1">
              {completedSections.length}/{chapter?.content.sections.length}
            </div>
            <div className="text-sm">Sections Completed</div>
          </div>
        </div>
        <Progress 
          value={(xp % 100) / level} 
          className="h-3 bg-white/20"
          indicatorClassName="bg-yellow-400"
        />
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.slice(-2).map((achievement, index) => (
              <AchievementBadge
                key={index}
                icon={<Star className="h-5 w-5 text-yellow-500" />}
                title={achievement}
                color="bg-yellow-500"
              />
            ))}
          </div>
        </div>
      )}

      {/* Keep existing content rendering */}
      {chapter?.content.sections.map((section, index) => (
        <div key={index}>
          {renderContentSection(section, index)}
        </div>
      ))}

      {/* Gamified Quiz */}
      {chapter?.quiz && (
        <Card className="mb-6 border-2 border-yellow-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-yellow-500">{chapter.quiz.title}</CardTitle>
              </div>
              {!showQuiz && (
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Start Quiz 🚀
                </Button>
              )}
            </div>
          </CardHeader>
          {/* Keep existing quiz logic */}
          {quizSubmitted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-4 text-center"
            >
              <div className={`text-4xl font-bold mb-2 ${score >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                {score}%
              </div>
              <div className="flex justify-center gap-2">
                {score >= 90 && <AchievementBadge icon="🏅" title="Gold Medal" color="bg-yellow-500" />}
                {score >= 70 && <AchievementBadge icon="🥈" title="Silver Medal" color="bg-gray-300" />}
                {score < 70 && <AchievementBadge icon="📚" title="Keep Learning!" color="bg-blue-500" />}
              </div>
            </motion.div>
          )}
        </Card>
      )}

      {/* Resources with XP rewards */}
      {chapter?.content.resources && (
        <Card className="bg-gradient-to-br from-purple-100 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              Power-Ups & Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {chapter.content.resources.map((resource, index) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {resource.type === 'link' ? (
                    <LinkIcon className="h-5 w-5 text-purple-600" />
                  ) : (
                    <Download className="h-5 w-5 text-blue-600" />
                  )}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                    onClick={() => addXp(10)}
                  >
                    {resource.title}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  +10 XP <Zap className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}