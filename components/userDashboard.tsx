"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Trophy,
  BookOpen,
  Star,
  Rocket,
  Award,
  BarChart3,
  Calendar,
  Flame
} from "lucide-react";

const UserDashboard = ({ user, enrollments, achievements, quizAttempts }:any) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user.name?.charAt(0) || user.email.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user.name || user.email}!
            </h1>
            <p className="text-gray-600 text-lg mt-2">Level {user.level} Learner</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { 
            icon: Trophy, 
            title: "Level", 
            value: user.level,
            color: "from-blue-400 to-indigo-500"
          },
          { 
            icon: Star, 
            title: "XP", 
            value: user.experiencePoints,
            color: "from-purple-400 to-fuchsia-500"
          },
          { 
            icon: Flame, 
            title: "Streak", 
            value: `${user.streakDays} days`,
            color: "from-orange-400 to-red-500"
          },
          { 
            icon: Award, 
            title: "Coins", 
            value: user.totalCoins,
            color: "from-yellow-400 to-orange-500"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="relative group"
          >
            <Card className="border-2 border-indigo-50 hover:border-indigo-100 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Course Progress */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="mb-12"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {enrollments?.map((enrollment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{enrollment.course.title}</h3>
                    <span className="text-gray-600">{enrollment.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${enrollment.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {achievements?.map((achievement, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="group"
          >
            <Card className="border-2 border-indigo-50 hover:border-indigo-100 transition-all overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-white mix-blend-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.achievement.description}</p>
                    <p className="text-indigo-600 text-sm mt-1">+{achievement.achievement.xpReward} XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserDashboard;