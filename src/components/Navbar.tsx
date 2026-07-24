'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all bg-black/10 backdrop:blur-lg`}
    >
      <div className="container mx-auto flex items-center justify-between px-10 py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-3xl text-orange-500 font-extrabold">
            Trek<span className="text-black">Wise</span>
          </Link>
          <img className="w-8 h-8" src="/logo.png" alt="icon" />
        </div>

        {status === 'loading' ? (
          <div className="w-6 h-6 border-4 mr-10 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        ) : session ? (
          <div className="flex items-center gap-6 relative">
            <Link
              href="/my-trip"
              className="text-white/75 font-medium border-[2px] border-white/75 hover:border-orange-400 px-2 py-1 rounded-full hover:text-orange-400 transition"
            >
              My Trips
            </Link>

            <div className="relative">
              <img
                src={session.user?.image || '/user.png'}
                alt="user"
                className="w-10 h-10 rounded-full border-[2px] border-orange-500 cursor-pointer"
                onClick={toggleDropdown}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-orange-100 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-md text-black">
                      Hi, <span className="font-semibold">{session.user?.name?.split(' ')[0]}</span>!
                    </p>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left font-bold px-4 py-2 hover:rounded-b-md text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-orange-500 font-semibold text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
