// app/auth/login.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/api';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      if (rememberMe) {
        // Implement remember me functionality if needed
        // For example, you could store a flag in localStorage
        localStorage.setItem('rememberMe', 'true');
      }
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Head>
        <title>Login | MediCare Plus</title>
      </Head>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
        {/* Left side - Logo and Description */}
        <div className="bg-indigo-600 text-white p-8 md:w-1/2 flex flex-col justify-center items-center text-center">
          <Image src="/login2.webp" alt="MediCare Plus Logo" width={200} height={150} className="mb-8" />
          <h1 className="text-4xl font-bold mb-4">MediCare Plus</h1>
          <p className="text-xl mb-6">Advanced Medical Management System</p>
          <p className="text-sm opacity-75">Empowering healthcare professionals with cutting-edge technology for seamless patient care and efficient hospital management.</p>
        </div>

        {/* Right side - Login Form */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}