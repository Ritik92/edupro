"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'sonner';
import { 
  BookOpen, Video, Code, FileText, Link as LinkIcon, 
  List, Download, Globe, CheckCircle, ArrowRight, Play,
  Clock, Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const SectionCard = ({ icon: Icon, title, children, className = "" }) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className={className}
  >
    <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-indigo-50 hover:border-indigo-100 transition-all duration-300 group">
      <div className="p-6 border-b border-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
      </div>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  </motion.div>
);

const ResourceCard = ({ resource }) => (
  <motion.div
    variants={fadeIn}
    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all group"
  >
    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
      {resource.type === 'link' ? (
        <LinkIcon className="h-4 w-4 text-indigo-600" />
      ) : (
        <Download className="h-4 w-4 text-indigo-600" />
      )}
    </div>
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-gray-700 hover:text-indigo-600 transition-colors truncate flex-1"
    >
      {resource.title}
    </a>
    <ArrowRight className="h-4 w-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const CodeBlock = ({ code, language }) => (
  <pre className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-4 rounded-xl overflow-x-auto text-sm">
    <code className={`language-${language}`}>{code}</code>
  </pre>
);

export default function ChapterContent() {
  const params = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [quizState, setQuizState] = useState({
    show: false,
    answers: {},
    submitted: false,
    score: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${params.courseId}/chapters/${params.chapterId}`);
        setChapter(data);
        setIsCompleted(data.userProgress?.[0]?.completed || false);
        
        await axios.post(`/api/courses/${params.courseId}/chapters/${params.chapterId}`, {
          type: 'view'
        });
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to load chapter content');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [params]);

  const handleQuizSubmit = async () => {
    if (!chapter?.quiz) return;
    
    const correctCount = chapter.quiz.questions.reduce((acc, question) => 
      acc + (quizState.answers[question.id] === question.correctAnswer ? 1 : 0), 0);
    
    const finalScore = Math.round((correctCount / chapter.quiz.questions.length) * 100);
    const passed = finalScore >= 70;

    try {
      await axios.post(`/api/courses/${params.courseId}/chapters/${params.chapterId}`, {
        type: 'quiz',
        quizId: chapter.quiz.id,
        score: finalScore,
        passed
      });

      setQuizState(prev => ({ ...prev, submitted: true, score: finalScore }));
      
      if (passed) {
        setIsCompleted(true);
        toast.success(`Quiz passed! +${chapter.xpReward} XP earned`, {
          description: `You scored ${finalScore}% - Great job!`
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit quiz results');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!chapter) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <Alert variant="destructive">
        <AlertTitle>Content Error</AlertTitle>
        <AlertDescription>Chapter not found</AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.header 
          className="relative z-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            {isCompleted ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">In Progress</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-600">
              <Star className="h-5 w-5" />
              <span className="font-medium">+{chapter.xpReward} XP</span>
            </div>
          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {chapter.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {chapter.contentSummary}
          </p>
        </motion.header>

        <motion.main 
          className="relative z-10 space-y-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {chapter.videos?.length > 0 && (
            <SectionCard icon={Video} title="Video Content">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-indigo-600" />
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-32 border-indigo-100">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden relative group shadow-lg">
                  {chapter.videos.find(v => v.language === selectedLanguage)?.videoUrl ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      src={chapter.videos.find(v => v.language === selectedLanguage)?.videoUrl}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-indigo-600">
                      <Play className="h-16 w-16" />
                      <p className="text-lg font-medium">Video unavailable in selected language</p>
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          )}

          {chapter.content.sections.map((section, i) => (
            <SectionCard
              key={i}
              icon={section.type === 'code' ? Code : section.type === 'list' ? List : FileText}
              title={section.title}
            >
              {section.type === 'code' && (
                <CodeBlock code={section.content || ''} language={section.language || 'javascript'} />
              )}
              
              {section.type === 'list' && (
                <ul className="space-y-3 pl-4">
                  {section.items?.map((item, j) => (
                    <li key={j} className="text-gray-600 list-disc leading-relaxed">{item}</li>
                  ))}
                </ul>
              )}
              
              {section.type === 'text' && (
                <div className="prose prose-indigo max-w-none">
                  {section.content}
                </div>
              )}
            </SectionCard>
          ))}

          {chapter.quiz && (
            <SectionCard icon={BookOpen} title={chapter.quiz.title}>
              {!quizState.show ? (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Test your knowledge and earn XP!</p>
                  <Button 
                    onClick={() => setQuizState(p => ({ ...p, show: true }))}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {chapter.quiz.questions.map((question, idx) => (
                    <div key={question.id} className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
                      <h3 className="font-medium text-lg text-gray-800">
                        {idx + 1}. {question.questionText}
                      </h3>
                      <RadioGroup
                        value={quizState.answers[question.id]}
                        onValueChange={value => setQuizState(p => ({
                          ...p,
                          answers: { ...p.answers, [question.id]: value }
                        }))}
                        className="space-y-3"
                      >
                        {[question.option1, question.option2, question.option3, question.option4].map((opt, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                            <RadioGroupItem
                              value={opt}
                              id={`q${question.id}-${j}`}
                              disabled={quizState.submitted}
                              className="text-indigo-600"
                            />
                            <Label htmlFor={`q${question.id}-${j}`} className="font-normal text-gray-700 cursor-pointer">
                              {opt}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

{quizState.submitted ? ( 
  //@ts-ignore
                      <Alert variant={quizState.score >= 70 ? 'success' : 'destructive'}>
                        <AlertTitle>
                          {quizState.score >= 70 ? 'Congratulations! 🎉' : 'Keep Learning! 💪'}
                        </AlertTitle>
                        <AlertDescription>
                          Your score: {quizState.score}% - {quizState.score >= 70 ? `You've earned ${chapter.xpReward} XP!` : 'Try again to earn XP'}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Button 
                        onClick={handleQuizSubmit}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-6"
                      >
                        Submit Quiz
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    )}
                  </div>
                )}
            </SectionCard>
          )}

          {chapter.content.resources?.length > 0 && (
            <SectionCard icon={LinkIcon} title="Additional Resources">
              <div className="grid gap-3">
                {chapter.content.resources.map((resource, i) => (
                  <ResourceCard key={i} resource={resource} />
                ))}
              </div>
            </SectionCard>
          )}
        </motion.main>

        {/* Floating Shapes Animation */}
        <motion.div 
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-xl"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}