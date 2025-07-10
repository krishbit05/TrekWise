import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient, Prisma } from '@prisma/client';
import { generateTravelPlan } from '@/lib/gemini/generateTravelPlan';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { destination, days, budget, group } = body;

  if (!destination || !days || !budget || !group) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const prompt = `Generate Travel Plan for Location: ${destination}, for ${days} Days for ${group} with a ${budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${days} days with each day plan with best time to visit in JSON format.`;

    const aiRaw = await generateTravelPlan(prompt);
    const cleaned = aiRaw.replace(/^```json/, '').replace(/^```/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error('[JSON_PARSE_FAIL]', cleaned);
      return NextResponse.json({ error: 'Invalid JSON from AI' }, { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newTrip = await prisma.trip.create({
      data: {
        destination,
        days: Number(days),
        budget,
        group,
        userId: user.id,
        // @ts-ignore
        data: parsed as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true, data: newTrip });
  } catch (err: any) {
    console.error('[TRIP_POST_ERROR]', err);
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 });
  }
}
