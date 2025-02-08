import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user with all related data
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email 
      },
      include: {
        // Get enrollments with course details
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                difficulty: true,
                xpReward: true
              }
            }
          }
        },
        // Get achievements with details
        achievements: {
          include: {
            achievement: true
          },
          orderBy: {
            unlockedAt: 'desc'
          }
        },
        // Get quiz attempts with quiz details
        quizAttempts: {
          include: {
            quiz: {
              select: {
                title: true,
                minPassScore: true,
                xpReward: true,
                chapter: {
                  select: {
                    title: true,
                    course: {
                      select: {
                        title: true
                      }
                    }
                  }
                }
              }
            }
          },
          orderBy: {
            attemptedAt: 'desc'
          },
          take: 5 // Get only the last 5 quiz attempts
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate additional stats
    const stats = {
      totalCoursesEnrolled: user.enrollments.length,
      achievementsUnlocked: user.achievements.length,
      totalQuizzesTaken: user.quizAttempts.length,
      averageQuizScore: user.quizAttempts.length > 0
        ? user.quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / user.quizAttempts.length
        : 0,
      totalXPEarned: user.experiencePoints,
      currentStreak: user.streakDays
    };

    // Check and update streak
    const lastLoginDate = user.lastLoginDate;
    const currentDate = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    if (!lastLoginDate || 
        currentDate.getTime() - lastLoginDate.getTime() > oneDayInMs) {
      // Update last login date and potentially streak
      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          lastLoginDate: currentDate,
          // If last login was yesterday, increment streak, otherwise reset to 1
          streakDays: lastLoginDate && 
            currentDate.getTime() - lastLoginDate.getTime() <= oneDayInMs * 2
            ? { increment: 1 }
            : 1
        }
      });
      stats.currentStreak = updatedUser.streakDays;
    }

    // Get course progress
    const courseProgress = await Promise.all(
      user.enrollments.map(async (enrollment) => {
        const chapters = await prisma.chapter.count({
          where: { courseId: enrollment.courseId }
        });
        
        const completedChapters = await prisma.userProgress.count({
          where: {
            userId: user.id,
            chapter: {
              courseId: enrollment.courseId
            },
            completed: true
          }
        });

        return {
          ...enrollment,
          totalChapters: chapters,
          completedChapters,
          progressPercentage: chapters > 0 
            ? Math.round((completedChapters / chapters) * 100) 
            : 0
        };
      })
    );

    // Prepare response data
    const dashboardData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        level: user.level,
        experiencePoints: user.experiencePoints,
        totalCoins: user.totalCoins,
        streakDays: stats.currentStreak,
        preferredLang: user.preferredLang
      },
      stats,
      courseProgress,
      achievements: user.achievements,
      recentQuizAttempts: user.quizAttempts
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update dashboard data
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { preferredLang } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { preferredLang }
    });

    return NextResponse.json({
      message: "Settings updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error('Dashboard update error:', error);
    return NextResponse.json(
      { error: "Failed to update dashboard settings" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}