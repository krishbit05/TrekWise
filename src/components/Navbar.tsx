'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 bg-white z-50 transition-all ${
        scrolled ? 'shadow-lg bg-orange-100' : ''
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-10 py-3">
        <Link href="/" className="text-3xl font-extrabold">
          Trek<span className="text-orange-500">Wise</span>
        </Link>

        <Link
          href="/login"
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
