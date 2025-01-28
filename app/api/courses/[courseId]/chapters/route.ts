import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the params interface according to Next.js App Router expectations
interface RouteContext {
  params: {
    courseId: string;
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const courseId = parseInt(context.params.courseId);

    // Validate courseId
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    // Fetch chapters for the course
    const chapters = await prisma.chapter.findMany({
      where: { courseId },
      orderBy: { sequenceOrder: 'asc' },
      include: {
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}