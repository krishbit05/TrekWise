'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-16 px-4">
      <div className="container mx-auto text-center max-w-6xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 mb-4">
          Discover your next adventure with AI :)
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
          Personalised itineraries at your fingertips
        </h2>

        <p className="text-white/80 text-base sm:text-lg mb-8">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

        <Link
          href="/create-trip"
          className="inline-block bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-900 transition"
        >
          Get Started, It&apos;s Free
        </Link>
      </div>
      <div className="relative overflow-hidden mt-40 mb-40 px-4">
        <img
          src="/landing.png"
          alt="Trekwise Screenshot"
          className="w-full max-w-8xl drop-shadow-xl rounded-lg"
        />
      </div>

    </header>
  );
}
