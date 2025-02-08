import { authOptions } from '@/auth.config';
import razorpay from '@/lib/razorpay';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { courseId } = await req.json();

    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });
    
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    const amount = Math.round(course.price * 100); // Razorpay expects amount in paise

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `course-${courseId}`,
    });

    // Ensure user ID type matches your database schema
    const payment = await prisma.payment.create({
      data: {
        userId: Number(session.user.id), // Adjust if using string IDs
        courseId: Number(courseId),
        amount: course.price,
        razorpayOrderId: order.id,
        status: 'PENDING', // Add initial payment status
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: 'INR',
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { message: 'Error creating order' },
      { status: 500 }
    );
  }
}