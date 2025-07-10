'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Registration successful');
      router.push('/signin');
    } else {
      toast.error(data.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-orange-900 px-4 rounded-xl">
      <div className="bg-white/10 backdrop-blur-lg border border-orange-400/30 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-6 text-center">
          Create an Account
        </h1>

        <div className="space-y-4">
          <div>
            <label className=''>Username
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-orange-300 rounded-md px-4 py-2 placeholder-orange-200 text-white focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className=''>Email
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-orange-300 rounded-md px-4 py-2 placeholder-orange-200 text-white focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className=''>Password
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-orange-300 rounded-md px-4 py-2 placeholder-orange-200 text-white focus:outline-none"
              />
            </label>
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
