'use client';
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

const LOCATIONIQ_TOKEN = process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN!;

export default function LocationAutocomplete({
  onSelect,
}: {
  onSelect: (place: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);
  const [results, setResults] = useState([]);

  const fetchLocations = async (search: string) => {
    if (!search) return setResults([]);

    try {
      const res = await axios.get('https://us1.locationiq.com/v1/search.php', {
        params: {
          key: LOCATIONIQ_TOKEN, 
          q: search,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          'Accept-Language': 'en',
        },
      });

      setResults(res.data);
    } catch (error) {
      console.error('Error fetching locations from LocationIQ:', error);
      setResults([]);
    }
  }
  // Fetch when debounced input changes
  useEffect(() => {
    fetchLocations(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder="Enter location"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded-md bg-white/85 focus:outline-none focus:border-orange-500 placeholder:text-black/70"
      />
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white shadow-md rounded mt-1 z-10 max-h-60 overflow-auto">
          {results.map((place: any) => (
            <li
              key={place.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(place.display_name);
                setQuery(place.display_name);
                setResults([]);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
