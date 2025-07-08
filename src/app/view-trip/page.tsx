'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import TripInformation from '@/components/TripInformation';
import HotelList from '@/components/HotelList';
import ItineraryDay from '@/components/ItineraryDay';
import TripSkeleton from '@/components/TripSkelton';
  
type Activity = {
    placeName: string;
    placeDetails: string;
    imageUrl: string;
    geoCoordinates: {
      latitude: number;
      longitude: number;
    };
    ticketPricing: string;
    rating: number;
    timeToSpend: string;
    travelTimeFromPrevious: string;
  };
type DayPlan = {
    day: number;
    theme: string;
    dailyPlan: Activity[];
  };
  
  type Itinerary = DayPlan[];
export default function ViewTripPage() {
    const { data: session, status } = useSession();
    const [trip, setTrip] = useState<any | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await fetch('/api/trips/latest');
                if (res.ok) {
                    const data = await res.json();
                    setTrip(data.data); // ✅ Corrected here
                    console.log('Fetched Trip:', data.data);
                } else {
                    console.error('Failed to fetch trip:', await res.json());
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        if (status === 'authenticated') fetchTrip();
    }, [status]);

    if (!trip) {
        return (
            <TripSkeleton/>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <TripInformation tripDetails={trip.travelPlan} />
            <HotelList hotels={trip.travelPlan.hotelOptions} />
            {trip.travelPlan.itinerary.map((dayPlan:DayPlan, index:number) => (
                <ItineraryDay
                    key={index}
                    day={dayPlan.day}
                    theme={dayPlan.theme}
                    dailyPlan={dayPlan.dailyPlan}
                />
            ))}
        </div>
    );
}
