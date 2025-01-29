import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Updated interface with Promise for params
interface RouteContext {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const courseId = parseInt(params.courseId);
    const chapterId = parseInt(params.chapterId);

    // Validate IDs
    if (isNaN(courseId) || isNaN(chapterId)) {
      return NextResponse.json(
        { error: 'Invalid course ID or chapter ID' },
        { status: 400 }
      );
    }

    // Fetch chapter with videos
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
          },
        },
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