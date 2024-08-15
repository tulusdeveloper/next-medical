// components/sidebar/Sidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaChartBar, FaCalendarAlt, FaUserInjured, FaClipboardList,
  FaFileInvoiceDollar, FaUserMd, FaFlask, FaBed, FaAmbulance,
  FaPills, FaNotesMedical, FaCog, FaBars, FaTimes, FaSignOutAlt
} from 'react-icons/fa';
import LogoutModal from '@/components/logout/LogoutModal';
import { logout } from '@/utils/api';

const menuItems = [
  { name: 'Dashboard', icon: FaChartBar, href: '/dashboard' },
  { name: 'Appointments', icon: FaCalendarAlt, href: '/home/appointments' },
  { name: 'Patients', icon: FaUserInjured, href: '/patients' },
  { name: 'Doctors', icon: FaUserMd, href: '/doctors' },
  { name: 'Lab Results', icon: FaFlask, href: '/lab-results' },
  { name: 'Admissions', icon: FaBed, href: '/admissions' },
  { name: 'Emergency', icon: FaAmbulance, href: '/emergency' },
  { name: 'Pharmacy', icon: FaPills, href: '/pharmacy' },
  { name: 'Medical Records', icon: FaNotesMedical, href: '/medical-records' },
  { name: 'Billing', icon: FaFileInvoiceDollar, href: '/billing' },
  { name: 'Settings', icon: FaCog, href: '/settings' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-20 lg:hidden bg-blue-500 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`
        bg-white w-64 min-h-screen p-4 fixed left-0 top-0 z-10 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="text-xl font-semibold ml-2">MediCare Pro</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3 text-lg" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <button
          className="flex items-center p-2 mt-6 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
