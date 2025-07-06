'use client';
import { budgetOptions, groupOptions } from '@/src/constants/options'
import LocationAutocomplete from '@/src/components/LocationAutocomplete';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

import axios from 'axios';

export default function CreateTripPage() {
    const [location, setLocation] = useState('');
    const [days, setDays] = useState('');
    const [budget, setBudget] = useState('');
    const [group, setGroup] = useState('');


    const getTravelPlan = async () => {
      try {
        const response = await axios.post('/api/trips', {
          destination: location,
          days: days,
          budget: budget,
          group: group,
        });
    
        // The API returns a stringified JSON; parse it to use as an object
        const travelData = JSON.parse(response.data.data);
        console.log(travelData);
        return travelData;
      } catch (error: any) {
        console.error('Failed to fetch travel plan:', error.response?.data || error.message);
      }
    };
      
    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Tell us your travel preferences🏕️🌴</h1>
                <p className="text-gray-600 mb-6">
                    Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>

            <div>
                <label className="block text-xl font-bold text-gray-700 mb-1">
                    What is your destination of choice?
                </label>
                <LocationAutocomplete onSelect={setLocation} />
                <p className="text-sm text-gray-500 mt-1 mb-4">Selected: {location}</p>
            </div>

            <div>
                <label className="block text-xl font-bold text-gray-700 mb-1">
                    How many days are you planning your trip?
                </label>
                <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full border rounded px-4 py-2 mb-6"
                    placeholder="e.g. 5"
                />
            </div>

            <div>
                <label className="block text-xl font-bold text-gray-700 mb-2">
                    What is your budget?
                </label>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {budgetOptions.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                'border rounded-lg p-4 text-center cursor-pointer transition hover:shadow-xl',
                                budget === item.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'bg-white'
                            )}
                            onClick={() => setBudget(item.id)}
                        >
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <div className="font-extrabold">{item.title}</div>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}

                </div>

                <label className="block text-xl font-bold text-gray-700 mb-2">
                    Who do you plan on traveling with on your next adventure?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {groupOptions.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                'border rounded-lg p-4 text-center cursor-pointer transition hover:shadow-xl',
                                group === item.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'bg-white'
                            )}
                            onClick={() => setGroup(item.id)}
                        >
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <div className="font-extrabold ">{item.title}</div>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                            <p className="text-xs text-gray-400">{item.people}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={getTravelPlan}
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
                >
                    Generate Trip
                </button>
            </div>
        </div>
    );
}
