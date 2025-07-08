'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LucideClockFading } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 bg-white z-50 transition-all ${
        scrolled ? 'shadow-xl bg-orange-200' : ''
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-10 py-3">
        <Link href="/" className="text-3xl font-extrabold">
          Trek<span className="text-orange-500">Wise</span>
        </Link>

        {status === 'loading' ? (
          <div className="w-10 h-10 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        ) : session ? (
          <div className="flex items-center gap-4">
            <p className="text-gray-700">Hi, {session.user?.name?.split(' ')[0]}</p>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
