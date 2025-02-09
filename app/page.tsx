"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, BookOpen, Brain, Globe, Volume,
  MessageSquare, Trophy, CreditCard, ChevronDown,
  Sparkles, Target, Users
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '50%']);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Animated Background Patterns */}
      <motion.div 
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      >
        <motion.div style={{ y: backgroundY }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl"
              style={{
                width: Math.random() * 400 + 200,
                height: Math.random() * 400 + 200,
                background: `linear-gradient(${Math.random() * 360}deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">AI-Powered Learning Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-7xl sm:text-8xl font-black tracking-tight leading-none"
            >
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent 
                bg-[length:200%] animate-gradient">
                Future of
              </span>
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent 
                bg-[length:200%] animate-gradient [animation-delay:0.2s]">
                Learning
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 font-light leading-relaxed"
            >
              Experience the next generation of education with personalized AI learning paths, 
              multilingual support, and interactive content.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12"
            >
              <Button 
                size="lg"
                className="group relative px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                  hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"
                  style={{ mixBlendMode: "overlay" }}
                />
                <span className="relative flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 
                  transition-all duration-300"
              >
                <Target className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex items-center justify-center gap-8 mt-16"
            >
              {[
                { count: "50K+", label: "Active Students" },
                { count: "100+", label: "Countries" },
                { count: "4.9/5", label: "Rating" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.count}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-indigo-600" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Learning Path",
                description: "Personalized curriculum that adapts to your progress",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Globe,
                title: "Learn in Any Language",
                description: "Content available in 50+ languages",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Volume,
                title: "Voice Navigation",
                description: "Hands-free learning experience",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: MessageSquare,
                title: "AI Tutor",
                description: "24/7 personalized assistance",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Trophy,
                title: "Global Rankings",
                description: "Compete with learners worldwide",
                color: "from-rose-500 to-orange-500"
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description: "Seamless Razorpay integration",
                color: "from-orange-500 to-yellow-500"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-indigo-50 
                  hover:border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 
                  transition-opacity duration-300 rounded-3xl`} />
                
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 
                  group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-16"
          >
            <div className="relative z-10 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Join thousands of successful learners and start your journey today
              </p>
              <Button
                size="lg"
                className="px-12 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 
                  transform transition-all duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "40px 40px"
              }} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}