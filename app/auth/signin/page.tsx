"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, Lock, GraduationCap, Rocket, Sparkles, Users, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignIn) {
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          toast.error('Invalid credentials. Please check your email and password.');
          setLoading(false); // Reset loading state
          return;
        }

        if (result?.ok) {
          toast.success('Sign in successful!');
          router.push('/courses');
          router.refresh();
        }
      } catch (error) {
        toast.error('An error occurred during sign in. Please try again.');
        setLoading(false); // Reset loading state
      }
    } else {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          toast.success('Sign up successful! Please sign in.');
          setIsSignIn(true);
        } else {
          toast.error('Sign up failed. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred during sign up. Please try again.');
      }
      setLoading(false); // Reset loading state
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 to-purple-100/50">
      <div className="container min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="grid lg:grid-cols-2 h-full">
            {/* Left Side (Welcome Section) */}
            <motion.div
              variants={itemVariants}
              className="p-8 lg:p-12 flex flex-col justify-between relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
            >
              <div className="relative z-10">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center text-xl font-bold mb-8 gap-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <GraduationCap className="h-8 w-8 text-purple-200" />
                  <span className="bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
                    EduPro
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
                >
                  Transform Your Learning Journey
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-purple-100/80 mb-8 leading-relaxed"
                >
                  Join our community of passionate learners and unlock your potential with industry-leading courses.
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="space-y-6 relative z-10"
              >
                <div className="h-px bg-white/20" />
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { number: '500+', label: 'Courses', icon: <BookOpen className="h-5 w-5" /> },
                    { number: '50k+', label: 'Students', icon: <Users className="h-5 w-5" /> },
                    { number: '100+', label: 'Experts', icon: <Sparkles className="h-5 w-5" /> },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="p-2 backdrop-blur-sm bg-white/5 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2 text-purple-100">
                        {stat.icon}
                        <div>
                          <div className="text-xl font-bold">{stat.number}</div>
                          <div className="text-sm">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/5 rounded-full"
                    style={{
                      width: `${Math.random() * 100 + 50}px`,
                      height: `${Math.random() * 100 + 50}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Side (Form Section) */}
            <motion.div
              variants={itemVariants}
              className="p-8 lg:p-12 bg-white/50 backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignIn ? 'signin' : 'signup'}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="h-8 w-8 text-indigo-600" />
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {isSignIn ? 'Welcome Back!' : 'Get Started'}
                      </h2>
                    </div>
                    <p className="text-gray-600">
                      {isSignIn
                        ? 'Sign in to continue your learning journey'
                        : 'Create your account to join the community'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      {/* Email Input */}
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          required
                          disabled={loading}
                        />
                      </motion.div>

                      {/* Password Input */}
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          required
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 hover:bg-indigo-50"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all"
                        disabled={loading}
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : null}
                        {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Create Account'}
                        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Toggle Between Sign In and Sign Up */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsSignIn(!isSignIn)}
                      disabled={loading}
                      className="text-gray-600 hover:text-indigo-600 group"
                    >
                      {isSignIn ? "Don't have an account? " : "Already have an account? "}
                      <span className="ml-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {isSignIn ? 'Sign up now' : 'Sign in here'}
                        <ArrowRight className="ml-1 h-4 w-4 inline-block transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;