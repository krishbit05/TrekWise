'use client';

import React, { useEffect, useState } from 'react';

type Hotel = {
  hotelName: string;
  description: string;
  address: string;
  price: string;
  rating: number;
};

const DEFAULT_IMAGE =
  'https://media.istockphoto.com/id/471642661/photo/colorful-corporate-building-at-sunset.jpg?s=612x612&w=0&k=20&c=Qbjod3C0t08dFtd3_ZCF1TV5mBofeDPnWfw7fvtp5yc=';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

async function getUnsplashImage(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    return data?.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error('Unsplash fetch failed:', err);
    return null;
  }
}

export default function HotelList({ hotels }: { hotels: Hotel[] }) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      const results: string[] = await Promise.all(
        hotels.map(async (hotel) => {
          const query = `${hotel.hotelName} ${hotel.address}`;
          const image = await getUnsplashImage(query);
          return image || DEFAULT_IMAGE;
        })
      );
      setImages(results);
    }

    loadImages();
  }, [hotels]);

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => {
          const imageSrc = images[index] || DEFAULT_IMAGE;

          return (
            <div
              key={index}
              className="bg-white border border-orange-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {/* Hotel Image */}
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={imageSrc}
                  alt={hotel.hotelName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                  }}
                />
              </div>

              {/* Hotel Details */}
              <div className="p-4 text-black space-y-2">
                <h3 className="text-lg font-semibold text-orange-900 truncate">
                  {hotel.hotelName}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

                <div className="text-sm text-gray-700 space-y-1 mt-2">
                  <p>
                    <span className="font-medium text-orange-700">📍 Address:</span>{' '}
                    {hotel.address}
                  </p>
                  <p>
                    <span className="font-medium text-orange-700">💵 Price:</span>{' '}
                    {hotel.price}
                  </p>
                  <p>
                    <span className="font-medium text-orange-700">⭐ Rating:</span>{' '}
                    {hotel.rating} / 5
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
