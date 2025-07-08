import React from 'react';

export default function TripSkeleton() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 animate-pulse">

      {/* Header Skeleton */}
      <div className="rounded-xl overflow-hidden shadow-xl bg-white">
        <div className="relative w-full h-64 bg-gray-200"></div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>

      {/* Hotels Skeleton */}
      <div>
        <div className="h-8 bg-gray-300 w-40 mb-4 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(2).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-orange-200 rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 w-3/4 rounded" />
                <div className="h-3 bg-gray-200 w-full rounded" />
                <div className="h-3 bg-gray-200 w-5/6 rounded" />
                <div className="h-3 bg-gray-200 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary Skeleton */}
      <div className="space-y-8">
        {Array(2).fill(0).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 bg-gray-300 w-1/3 rounded" />
            <div className="h-4 bg-gray-200 w-2/3 mb-3 rounded" />

            <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden">
              <div className="h-56 md:w-1/3 bg-gray-200" />
              <div className="p-6 flex flex-col space-y-2 md:w-2/3">
                <div className="h-4 bg-gray-300 w-2/3 rounded" />
                <div className="h-3 bg-gray-200 w-full rounded" />
                <div className="h-3 bg-gray-200 w-5/6 rounded" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
