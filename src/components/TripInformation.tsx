import React from 'react';

type TripDetailsProps = {
  tripDetails: {
    location: string;
    duration: string;
    budget: string;
    bestTimeToVisit: string;
    travelerType: string;
    imageUrl?: string;
  };
};

export default function TripInformation({ tripDetails }: TripDetailsProps) {
  const {
    location,
    duration,
    budget,
    bestTimeToVisit,
    travelerType,
    imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop',
  } = tripDetails;

  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-xl bg-white">
      {/* Image with Overlay */}
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={location}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/30 flex items-end p-6">
          <h2 className="text-white text-4xl font-bold drop-shadow-md">
            📍 {location}
          </h2>
        </div>
      </div>

      {/* Best Time Below Image */}
      <div className="px-6 pt-4 pb-2 text-gray-700 text-sm italic">
        <span className="font-medium">Best Time to Visit:</span> {bestTimeToVisit}
      </div>

      {/* Info Cards (without Best Time) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white">
        <InfoCard icon="🕒" label="Duration" value={duration} />
        <InfoCard icon="💰" label="Budget" value={budget} />
        <InfoCard icon="🧍‍♂️" label="Group Type" value={travelerType} />
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-orange-100 hover:bg-orange-200 transition-all duration-300 px-4 py-3 rounded-lg shadow-sm text-orange-800 space-y-1">
      <div className="text-md font-medium">{icon} {label}</div>
      <div className="text-sm text-black font-semibold truncate">{value}</div>
    </div>
  );
}
