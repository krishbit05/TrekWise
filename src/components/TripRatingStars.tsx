// components/TripRatingStars.tsx
'use client';

import { useState } from 'react';

export default function TripRatingStars({ tripId, initialRating }: { tripId: string, initialRating?: number }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(!!initialRating);

  const handleRating = async (value: number) => {
    if (submitted) return;

    setRating(value);
    setSubmitted(true);

    await fetch('/api/rate-trip', {
      method: 'POST',
      body: JSON.stringify({ tripId, rating: value }),
    });
  };

  return (
    <div className="flex mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => !submitted && setHover(star)}
          onMouseLeave={() => !submitted && setHover(0)}
          className={`w-5 h-5 cursor-pointer transition-colors ${
            star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
}
