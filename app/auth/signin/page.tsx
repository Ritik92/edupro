"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, Lock, GraduationCap } from 'lucide-react';
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
          router.push('/');
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
      transition: { duration: 0.5 },
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 h-full">
            {/* Left Side (Welcome Section) */}
            <motion.div
              variants={itemVariants}
              className="p-8 lg:p-12 flex flex-col justify-between relative bg-primary/95 text-white"
            >
              <div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center text-xl font-bold mb-8"
                >
                  <GraduationCap className="mr-2 h-8 w-8" />
                  EduPro
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-3xl lg:text-4xl font-bold mb-4"
                >
                  Welcome to the Future of Learning
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-white/80 mb-8"
                >
                  Join our platform to access world-class education and transform your learning journey.
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <div className="h-px bg-white/20" />
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-white/60">Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50k+</div>
                    <div className="text-sm text-white/60">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-sm text-white/60">Instructors</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side (Form Section) */}
            <motion.div
              variants={itemVariants}
              className="p-8 lg:p-12 bg-white rounded-l-3xl"
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
                    <h2 className="text-2xl font-bold mb-2">
                      {isSignIn ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500">
                      {isSignIn
                        ? 'Please sign in to access your account'
                        : 'Join us on your learning journey'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      {/* Email Input */}
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-primary"
                          required
                          disabled={loading}
                        />
                      </div>

                      {/* Password Input */}
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-primary" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-primary"
                          required
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="mr-2 h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                        />
                      ) : null}
                      {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Create Account'}
                      {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                  </form>

                  {/* Toggle Between Sign In and Sign Up */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setIsSignIn(!isSignIn);
                      }}
                      disabled={loading}
                      className="text-gray-600 hover:text-primary"
                    >
                      {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
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