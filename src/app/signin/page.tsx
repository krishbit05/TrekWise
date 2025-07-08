'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsLogin = async () => {
    if (!email || !password) {
      toast.error('Email and Password are required');
      return;
    }

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    if (res?.ok) {
      toast.success('Signed in successfully');
      window.location.href = callbackUrl;
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-orange-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-orange-400/30 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-6 text-center">
          Welcome to Trekwise 🚀
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-orange-300 rounded-md px-4 py-2 placeholder-orange-200 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 border border-orange-300 rounded-md px-4 py-2 placeholder-orange-200 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleCredentialsLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Sign in with Email
          </button>
        </div>

        <div className="my-4 text-center text-orange-200">or</div>

        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full flex justify-center items-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-md transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.28 1.45 7.73 2.66l5.73-5.73C33.34 3.27 28.98 1.5 24 1.5 14.94 1.5 7.3 7.6 4.29 15.01l6.86 5.34C12.65 14.02 17.88 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24.5c0-1.51-.14-2.96-.41-4.36H24v8.25h12.63c-.55 2.94-2.2 5.43-4.68 7.1l7.25 5.63C43.5 37.67 46.5 31.64 46.5 24.5z"
            />
            <path
              fill="#4A90E2"
              d="M9.19 28.67a14.87 14.87 0 0 1 0-9.34l-6.86-5.34a24 24 0 0 0 0 20.01l6.86-5.33z"
            />
            <path
              fill="#FBBC05"
              d="M24 46.5c6.48 0 11.92-2.13 15.9-5.83l-7.25-5.63c-2.08 1.39-4.77 2.21-8.65 2.21-6.12 0-11.35-4.52-13.14-10.85l-6.86 5.33C7.3 40.4 14.94 46.5 24 46.5z"
            />
          </svg>
          Sign in with Google
        </button>
        <p className="text-center text-sm text-orange-200 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-orange-400 hover:text-orange-300">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
