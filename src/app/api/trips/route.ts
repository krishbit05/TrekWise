import { NextResponse } from 'next/server';
import { generateTravelPlan } from '@/src/lib/gemini/generateTravelPlan';

export async function POST(req: Request) {
  const body = await req.json();

  const {
    destination,
    days,
    budget,
    group,
  } = body;

  const prompt = `Generate Travel Plan for Location: ${destination}, for ${days} Days for ${group} with a ${budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${days} days with each day plan with best time to visit in JSON format.`;

  try {
    const data = await generateTravelPlan(prompt);
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
