// app/api/rate-trip/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { tripId, rating } = body;

  try {
    await prisma.trip.update({
      where: { id: tripId },
      data: { rating: parseFloat(rating) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating rating:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
