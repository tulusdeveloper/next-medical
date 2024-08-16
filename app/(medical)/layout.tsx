"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
