import React from 'react';

type Hotel = {
  hotelName: string;
  description: string;
  imageUrl?: string;
  address: string;
  price: string;
  rating: number;
  geoCoordinates: {
    latitude: number;
    longitude: number;
  };
};

const DEFAULT_IMAGE =
  'https://media.istockphoto.com/id/471642661/photo/colorful-corporate-building-at-sunset.jpg?s=612x612&w=0&k=20&c=Qbjod3C0t08dFtd3_ZCF1TV5mBofeDPnWfw7fvtp5yc=';

export default function HotelList({ hotels }: { hotels: Hotel[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-black mb-6">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => {
          const imageSrc = hotel.imageUrl?.trim() ? hotel.imageUrl : DEFAULT_IMAGE;

          return (
            <div
              key={index}
              className="bg-white border border-orange-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
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
                <h3 className="text-lg font-semibold text-orange-900 truncate">{hotel.hotelName}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

                <div className="text-sm text-gray-700 space-y-1 mt-2">
                  <p>
                    <span className="font-medium text-orange-700">📍 Address:</span>{' '}
                    {hotel.address}
                  </p>
                  <p>
                    <span className="font-medium text-orange-700">📌 Coordinates:</span>{' '}
                    {hotel.geoCoordinates.latitude}, {hotel.geoCoordinates.longitude}
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
