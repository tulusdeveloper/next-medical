// components/sidebar/Sidebar.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaChartBar, FaCalendarAlt, FaUserInjured, FaCog, FaBars, FaTimes, FaSignOutAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import LogoutModal from '@/components/logout/LogoutModal';
import { logout } from '@/utils/api';

const menuItems = [
  { name: 'Dashboard', icon: FaChartBar, href: '/dashboard' },
  { name: 'Patients', icon: FaUserInjured, href: '/home/patients' },
  { name: 'Appointments', icon: FaCalendarAlt, href: '/home/appointments' },
  { name: 'Administration', icon: FaCog, href: '/home/administration' },
  { name: 'insurance', icon: FaCog, href: '/home/insurance' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
      <button
        className="fixed top-4 left-4 z-20 lg:hidden bg-blue-500 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside
        className={`
          bg-white ${isCollapsed ? 'w-16' : 'w-56'} min-h-screen p-4 fixed left-0 top-0 z-10 transition-all duration-300 ease-in-out shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex items-center justify-between mb-8">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
  <img src="/logo.png" alt="Logo" className={`h-8 transition-all duration-300 ${isCollapsed ? 'block mx-auto' : 'block'}`} />
  {!isCollapsed && (
    <span className="text-xl font-bold ml-3 text-gray-900">
      MediCare Pro
    </span>
  )}
</div>

          <button
            onClick={toggleCollapse}
            className="text-gray-700 hover:text-gray-900"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="text-lg" />
              {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>
        <button
          className={`flex items-center p-2 mt-6 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200 w-full ${
            isCollapsed ? 'justify-center' : ''
          }`}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <FaSignOutAlt className="text-lg" />
          {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
