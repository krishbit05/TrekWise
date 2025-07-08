import React from 'react';

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

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504712598893-24159a89200e?q=80&w=2070&auto=format&fit=crop';

export default function ItineraryDay({
  day,
  theme,
  dailyPlan,
}: {
  day: number;
  theme: string;
  dailyPlan: Activity[];
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-orange-900 mb-2">📅 Day {day}</h2>
      <p className="text-lg text-gray-700 font-medium mb-6">{theme}</p>

      <div className="space-y-6">
        {dailyPlan.map((activity, index) => {
          const imageSrc = activity.imageUrl?.trim() ? activity.imageUrl : FALLBACK_IMAGE;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-200"
            >
              {/* Image */}
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
