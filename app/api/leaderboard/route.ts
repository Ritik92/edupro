import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    // Fetch top 50 users ordered by experience points
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        level: true,
        experiencePoints: true,
        streakDays: true,
        achievements: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        experiencePoints: 'desc',
      },
      take: 50,
    });

    // Transform the data to include achievement count
    const transformedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      level: user.level,
      experiencePoints: user.experiencePoints,
      streakDays: user.streakDays,
      achievementCount: user.achievements.length,
    }));

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}