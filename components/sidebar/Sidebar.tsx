// components/sidebar/Sidebar.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaCalendarAlt, FaUserInjured, FaClipboardList, FaFileInvoiceDollar } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', icon: FaChartBar, href: '/dashboard' },
  { name: 'Schedules', icon: FaCalendarAlt, href: '/schedules' },
  { name: 'Patients', icon: FaUserInjured, href: '/patients' },
  { name: 'Appointments', icon: FaClipboardList, href: '/appointments' },
  { name: 'Billing', icon: FaFileInvoiceDollar, href: '/billing' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-white w-64 min-h-screen p-4">
      <div className="flex items-center justify-center mb-8">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <span className="text-xl font-semibold ml-2">Medicizen</span>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center p-2 rounded-lg mb-2 ${
              pathname === item.href ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;