import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config"; 

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 }); // Return empty array for non-authenticated users
    }
  
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        enrollments: true
      }
    });
  
    return NextResponse.json(user?.enrollments || []);
  }
  
export async function POST(req: NextRequest) {
  try {
    // 1. Get the authenticated session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse the request body
    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // 3. Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 4. Check if the course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Check if the user is already enrolled in the course
    const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId:user.id,
            courseId,
          },
        },
      });
      if (existingEnrollment) {
        return NextResponse.json(
          { error: 'User is already enrolled in this course' },
          { status: 400 }
        );
      }
    // 5. Create the enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
      include: {
        course: {
          select: {
            title: true,
            price: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: "Successfully enrolled in the course",
      enrollment
    }, { status: 201 });

  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "You are already enrolled in this course" },
        { status: 409 }
      );
    }

    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: "Failed to enroll in the course" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}