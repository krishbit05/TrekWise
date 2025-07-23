'use client';
import { budgetOptions, groupOptions } from '@/constants/options'
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateTripPage() {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [days, setDays] = useState('');
    const [budget, setBudget] = useState('');
    const [group, setGroup] = useState('');

    const { data: session } = useSession();
    const router = useRouter();

    const getTravelPlan = async () => {
        
        if (!location) return toast.error('Please select a destination');
        if (!session) return signIn();
        if (!days || Number(days) <= 0) return toast.error('Please enter a valid number of days');
        if (!budget) return toast.error('Please select a budget option');
        if (!group) return toast.error('Please select your travel group');
        
        setLoading(true);
        try {
            toast.loading('Generating your travel plan...');

            const response = await axios.post('/api/trips', {
                destination: location,
                days,
                budget,
                group,
            });

            const travelData = response.data?.data;
            if (!travelData) throw new Error('Empty data');

            console.log('[TRAVEL DATA]', travelData);

            toast.dismiss();
            toast.success('Travel plan generated successfully!');
            router.push(`/view-trip/${travelData.id}`);

            return travelData;
        } catch (error: any) {
            toast.dismiss();
            const errMsg = error.response?.data?.error || error.message || 'Unknown error';
            console.error('Failed to fetch travel plan:', errMsg);
            toast.error('Failed to fetch travel plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold text-orange-500 mb-2">Tell us your travel preferences🏕️🌴</h1>
                <p className="text-white mb-6">
                    Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>

            <div>
                <label className="block text-xl font-bold text-white mb-1">
                    What is your destination of choice?
                </label>
                <LocationAutocomplete onSelect={setLocation} />
                <p className="text-sm text-white/80 mt-1 mb-4">Selected: {location}</p>
            </div>

            <div>
                <label className="block text-xl font-bold text-white mb-1">
                    How many days are you planning your trip?
                </label>
                <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full border bg-white/85 focus:outline-none focus:border-orange-500 rounded px-4 py-2 mb-6 placeholder:text-black/70"
                    placeholder="e.g. 5"
                />
            </div>

            <div>
                <label className="block text-xl font-bold text-white mb-2">
                    What is your budget?
                </label>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {budgetOptions.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                'border rounded-lg p-4 text-center cursor-pointer transition hover:shadow-xl',
                                budget === item.id ? 'border-orange-500 bg-orange-300 shadow-md' : 'bg-white/85'
                            )}
                            onClick={() => setBudget(item.id)}
                        >
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <div className="font-extrabold">{item.title}</div>
                            <p className="text-sm ">{item.desc}</p>
                        </div>
                    ))}

                </div>

                <label className="block text-xl font-bold text-white mb-2">
                    Who do you plan on traveling with on your next adventure?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {groupOptions.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                'border rounded-lg p-4 text-center cursor-pointer transition hover:shadow-xl',
                                group === item.id ? 'border-orange-500 bg-orange-300 shadow-md' : 'bg-white/85'
                            )}
                            onClick={() => setGroup(item.id)}
                        >
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <div className="font-extrabold ">{item.title}</div>
                            <p className={cn("text-sm")}>{item.desc}</p>
                            <p className="text-xs text-gray-700">{item.people}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={getTravelPlan}
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        'Generate Trip'
                    )}
                </button>
            </div>
        </div>
    );
}
