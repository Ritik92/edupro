import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';


const prisma = new PrismaClient();

interface RouteContext {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const courseId = parseInt(params.courseId);
    const chapterId = parseInt(params.chapterId); //@ts-ignore
    const userId = parseInt(session.user.id);

    if (isNaN(courseId) || isNaN(chapterId)) {
      return NextResponse.json(
        { error: 'Invalid course ID or chapter ID' },
        { status: 400 }
      );
    }

    // Fetch chapter with related data including user progress
    const chapter = await prisma.chapter.findFirst({
      where: { 
        id: chapterId,
        courseId: courseId 
      },
      include: {
        videos: true,
        quiz: {
          include: {
            questions: true,
            attempts: {
              where: {
                userId: userId
              },
              orderBy: {
                attemptedAt: 'desc'
              },
              take: 1
            }
          },
        },
        userProgress: {
          where: {
            userId: userId
          }
        }
      },
    });

    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapter' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const chapterId = parseInt(params.chapterId); //@ts-ignore
    const userId = parseInt(session.user.id);
    const body = await request.json();
    
    if (body.type === 'quiz') {
      const { score, passed } = body;
      
      // Create quiz attempt
      const quizAttempt = await prisma.quizAttempt.create({
        data: {
          userId,
          quizId: body.quizId,
          score,
          passed,
        }
      });

      // If passed, update user progress and award XP
      if (passed) {
        const chapter = await prisma.chapter.findUnique({
          where: { id: chapterId },
          include: { quiz: true }
        });

        if (chapter?.quiz) {
          await prisma.$transaction([
            // Update user progress
            prisma.userProgress.upsert({
              where: {
                userId_chapterId: {
                  userId,
                  chapterId
                }
              },
              create: {
                userId,
                chapterId,
                completed: true
              },
              update: {
                completed: true,
                lastAccessed: new Date()
              }
            }),
            // Award XP
            prisma.user.update({
              where: { id: userId },
              data: {
                experiencePoints: {
                  increment: chapter.quiz.xpReward
                }
              }
            })
          ]);
        }
      }

      return NextResponse.json(quizAttempt);
    }

    // Update chapter progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      },
      create: {
        userId,
        chapterId,
        lastAccessed: new Date()
      },
      update: {
        lastAccessed: new Date()
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
