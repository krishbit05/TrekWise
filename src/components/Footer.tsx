import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-orange-50 text-orange-900 border-t border-orange-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Trekwise 🌍</h2>
          <p className="text-sm text-gray-700">
            Plan smart, travel smarter. Your AI-powered travel buddy for curated
            itineraries, hotels, and local experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li><a href="/" className="hover:text-orange-700">🏠 Home</a></li>
            <li><a href="/trips" className="hover:text-orange-700">🧳 My Trips</a></li>
            <li><a href="/explore" className="hover:text-orange-700">🗺️ Explore</a></li>
            <li><a href="/contact" className="hover:text-orange-700">📞 Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-orange-700">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram/></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 py-4 border-t border-orange-200">
        &copy; {new Date().getFullYear()} Trekwise. All rights reserved.
      </div>
    </footer>
  );
}
