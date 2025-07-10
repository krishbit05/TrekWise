'use client';

import React, { useEffect, useState } from 'react';

type Activity = {
  placeName: string;
  placeDetails: string;
  imageUrl: string;
  ticketPricing: string;
  rating: number;
  timeToSpend: string;
  travelTimeFromPrevious: string;
};

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504712598893-24159a89200e?q=80&w=2070&auto=format&fit=crop';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

async function getUnsplashImage(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error('Error fetching Unsplash image:', err);
    return null;
  }
}

export default function ItineraryDay({
  day,
  theme,
  dailyPlan,
}: {
  day: number;
  theme: string;
  dailyPlan: Activity[];
}) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      const imagePromises = dailyPlan.map(async (activity) => {
        try {
          const image = await getUnsplashImage(activity.placeName);
          return image || FALLBACK_IMAGE;
        } catch {
          return FALLBACK_IMAGE;
        }
      });

      const resolvedImages = await Promise.all(imagePromises);
      setImages(resolvedImages);
    }

    loadImages();
  }, [dailyPlan]);

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Day {day}</h2>
      <p className="text-lg text-white/80 font-medium mb-6">{theme}</p>

      <div className="space-y-6">
        {dailyPlan.map((activity, index) => {
          const imageSrc = images[index] || FALLBACK_IMAGE;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow ease-in-out overflow-hidden flex flex-col md:flex-row border border-gray-200"
            >
              <div className="md:w-1/3 h-60 md:h-auto">
                <img
                  src={imageSrc}
                  alt={activity.placeName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col justify-between md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-1">
                    📍 {activity.placeName}
                  </h3>
                  <p className="text-gray-700 text-sm">{activity.placeDetails}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                  <p>
                    <strong className="text-orange-700">🎟️ Ticket:</strong>{' '}
                    {activity.ticketPricing}
                  </p>
                  <p>
                    <strong className="text-orange-700">⭐ Rating:</strong>{' '}
                    {activity.rating} / 5
                  </p>
                  <p>
                    <strong className="text-orange-700">⏱️ Time to Spend:</strong>{' '}
                    {activity.timeToSpend}
                  </p>
                  <p>
                    <strong className="text-orange-700">🛣️ Travel Time:</strong>{' '}
                    {activity.travelTimeFromPrevious}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
