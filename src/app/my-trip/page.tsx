// app/view-trip/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import TripRatingStars from '@/components/TripRatingStars';


const prisma = new PrismaClient();

async function fetchUnsplashImage(destination: string): Promise<string> {
    const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&orientation=landscape&per_page=1&client_id=${UNSPLASH_KEY}`
        );
        const data = await res.json();
        return data?.results?.[0]?.urls?.regular || '/fallback.jpg';
    } catch (error) {
        console.error('Unsplash error:', error);
        return '/fallback.jpg';
    }
}

export default async function ViewTripPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-white text-lg">
                Please sign in to view your trips.
            </div>
        );
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { trips: true },
    });

    const trips = user?.trips || [];

    const tripsWithImages = await Promise.all(
        trips.map(async (trip) => ({
            ...trip,
            image: await fetchUnsplashImage(trip.destination),
        }))
    );

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-4xl font-bold text-orange-500 mb-10 text-center">
                Your Trips
            </h1>

            {trips.length === 0 ? (
                <div className="text-center text-white space-y-4">
                    <Image
                        src="/bag.png"
                        alt="No trips"
                        width={300}
                        height={300}
                        className="mx-auto"
                    />
                    <p className="text-xl text-white/85">You haven't created any journeys yet.</p>
                    <Link
                        href="/create-trip"
                        className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
                    >
                        Create Your First Trip
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tripsWithImages.map((trip) => (
                        <Link
                            key={trip.id}
                            href={`/view-trip/${trip.id}`}
                            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition border border-orange-400 h-[320px] flex flex-col"
                        >
                            <div className="relative h-[80%] w-full">
                                <Image
                                    src={trip.image}
                                    alt={trip.destination}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="h-[20%] px-4 py-2 bg-white/75 rounded-md">
                                <h2 className="text-xl font-bold text-orange-700 truncate">
                                    {trip.destination}
                                </h2>
                                <p className="text-sm text-black">
                                    {trip.days} Days trip with {trip.budget} Budget
                                </p>
                                <TripRatingStars tripId={trip.id} initialRating={trip.rating ?? undefined} />
                            </div>
                        </Link>
                        
                    ))}

                </div>

            )}
        </div>
    );
}
