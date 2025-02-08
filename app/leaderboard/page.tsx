"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, Flame, Crown, Rocket, Zap, Shield, Users, Star, Target } from "lucide-react";
import axios from 'axios';
export const demoLeaderboardData = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      level: 42,
      experiencePoints: 84750,
      streakDays: 145,
      achievementCount: 28
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      email: "alex.r@example.com",
      level: 39,
      experiencePoints: 78320,
      streakDays: 89,
      achievementCount: 25
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      level: 37,
      experiencePoints: 74150,
      streakDays: 120,
      achievementCount: 23
    },
    {
      id: 4,
      name: "Michael Chang",
      email: "m.chang@example.com",
      level: 35,
      experiencePoints: 70200,
      streakDays: 65,
      achievementCount: 20
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@example.com",
      level: 33,
      experiencePoints: 66800,
      streakDays: 78,
      achievementCount: 19
    },
    {
      id: 6,
      name: "James Wilson",
      email: "j.wilson@example.com",
      level: 31,
      experiencePoints: 62400,
      streakDays: 92,
      achievementCount: 18
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "m.garcia@example.com",
      level: 30,
      experiencePoints: 60100,
      streakDays: 55,
      achievementCount: 16
    },
    {
      id: 8,
      name: "David Kim",
      email: "d.kim@example.com",
      level: 29,
      experiencePoints: 58900,
      streakDays: 43,
      achievementCount: 15
    },
    {
      id: 9,
      name: "Sophie Martin",
      email: "s.martin@example.com",
      level: 28,
      experiencePoints: 56700,
      streakDays: 67,
      achievementCount: 14
    },
    {
      id: 10,
      name: "Oliver Brown",
      email: "o.brown@example.com",
      level: 27,
      experiencePoints: 54200,
      streakDays: 38,
      achievementCount: 13
    },
    {
      id: 11,
      name: "Ava Johnson",
      email: "ava.j@example.com",
      level: 26,
      experiencePoints: 52800,
      streakDays: 45,
      achievementCount: 12
    },
    {
      id: 12,
      name: "Lucas Silva",
      email: "l.silva@example.com",
      level: 25,
      experiencePoints: 50400,
      streakDays: 34,
      achievementCount: 11
    }
  ];
  interface LeaderboardUser {
    id: number;
    name: string;
    email: string;
    level: number;
    experiencePoints: number;
    streakDays: number;
    achievementCount: number;
  }

const LeaderboardPage = () => {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setUsers(demoLeaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-400 drop-shadow-glow-yellow" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-300 drop-shadow-glow-silver" />;
      case 2:
        return <Award className="h-8 w-8 text-amber-600 drop-shadow-glow-bronze" />;
      default:
        return null;
    }
  };

  const getGradientByRank = (index: number) => {
    switch (index) {
      case 0:
        return "from-yellow-400/90 via-yellow-300 to-amber-500/90";
      case 1:
        return "from-gray-400/90 via-gray-300 to-gray-500/90";
      case 2:
        return "from-amber-600/90 via-amber-500 to-amber-700/90";
      default:
        return "from-indigo-500/5 to-purple-500/5";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8 relative overflow-hidden">
      {/* Floating Shapes Animation */}
      <motion.div className="absolute top-0 left-0 w-full h-full">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-lg"
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

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="mb-6"
        >
          <Trophy className="h-16 w-16 text-yellow-400 mx-auto drop-shadow-glow-yellow" />
        </motion.div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-4">
          Global Leaderboard
        </h1>
        <p className="text-xl text-gray-600">Celebrating Our Top Achievers</p>
        
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mt-8 grid grid-cols-3 gap-4"
        >
          {[
            { icon: Users, label: "Active Learners", value: "10,000+" },
            { icon: Star, label: "Total XP Earned", value: "2.5M+" },
            { icon: Target, label: "Achievements", value: "50,000+" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <stat.icon className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-lg font-bold text-indigo-600">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <Card className="border-2 border-indigo-50 backdrop-blur-sm bg-white/50 relative z-10">
        <CardContent className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="h-12 w-12 text-indigo-600" />
              </motion.div>
              <p className="text-indigo-600 font-medium">Loading leaderboard...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  layoutId={`user-${user.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedId(selectedId === user.id ? null : user.id)}
                  className="relative"
                >
                  <motion.div
                    className={`
                      relative p-6 rounded-2xl cursor-pointer
                      ${index < 3 ? 'bg-gradient-to-r ' + getGradientByRank(index) : 'bg-white/80'}
                      backdrop-blur-sm
                      transition-all duration-300 hover:scale-[1.02]
                      border-2 ${index < 3 ? 'border-transparent' : 'border-indigo-50'}
                      ${selectedId === user.id ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Rank & User Info */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getRankIcon(index) || (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                            {user.name || user.email}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Zap className={`h-4 w-4 ${index < 3 ? 'text-white/80' : 'text-indigo-600'}`} />
                            <span className={`${index < 3 ? 'text-white/80' : 'text-gray-600'}`}>
                              Level {user.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                          <Shield className={`h-5 w-5 ${index < 3 ? 'text-white' : 'text-yellow-500'}`} />
                          <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                            {user.achievementCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flame className={`h-5 w-5 ${index < 3 ? 'text-white' : 'text-orange-500'}`} />
                          <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                            {user.streakDays}d
                          </span>
                        </div>
                        <div className="w-32 text-right">
                          <span className={`text-lg font-bold ${index < 3 ? 'text-white' : 'text-indigo-600'}`}>
                            {user.experiencePoints.toLocaleString()} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {selectedId === user.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <div className={`grid grid-cols-3 gap-4 ${index < 3 ? 'text-white/90' : 'text-gray-600'}`}>
                          <div>
                            <p className="text-sm opacity-80">Daily Streak</p>
                            <p className="text-lg font-semibold">{user.streakDays} Days</p>
                          </div>
                          <div>
                            <p className="text-sm opacity-80">Achievements</p>
                            <p className="text-lg font-semibold">{user.achievementCount} Unlocked</p>
                          </div>
                          <div>
                            <p className="text-sm opacity-80">Current Level</p>
                            <p className="text-lg font-semibold">Level {user.level}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;