import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Parse courseId from params
    await params;
    const courseId = parseInt(params.courseId);

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
              questions: true, // Include questions for each quiz
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