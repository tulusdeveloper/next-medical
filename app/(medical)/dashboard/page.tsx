// app/(medical)/dashboard.tsx

import React from 'react';
import { FaBed, FaUserMd, FaAmbulance } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={FaBed} title="Beds" value={86} description="Available hospital beds" />
        <MetricCard icon={FaUserMd} title="Doctors" value={126} description="Available doctors" />
        <MetricCard icon={FaAmbulance} title="Ambulans" value={32} description="Available ambulance" />
      </div>
      
      {/* Patient List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2">Ward No.</th>
              <th className="pb-2">Priority</th>
              <th className="pb-2">Start Date</th>
              <th className="pb-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            <PatientRow name="Adam Messy" wardNo="#012456" priority="Medium" startDate="June 3, 2023" endDate="--" />
            <PatientRow name="Celine Akiuta" wardNo="#985746" priority="Low" startDate="May 31, 2023" endDate="June 4, 2023" />
            <PatientRow name="Malaichi Ardo" wardNo="#047038" priority="High" startDate="June 2, 2023" endDate="--" />
            <PatientRow name="Mathius Olivera" wardNo="#348957" priority="Medium" startDate="June 1, 2023" endDate="June 5, 2023" />
          </tbody>
        </table>
      </div>
      
      {/* Schedule Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <div className="space-y-2">
          <ScheduleItem time="09:00 - 10:00" task="Check up patient" />
          <ScheduleItem time="10:00 - 11:00" task="Check up patient" />
          <ScheduleItem time="12:00 - 13:00" task="Lunch Break" />
          <ScheduleItem time="13:00 - 16:00" task="Heart Surgery" />
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ icon: React.ElementType; title: string; value: number; description: string }> = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <Icon className="text-blue-500 text-3xl mr-4" />
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold text-blue-600">{value}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const PatientRow: React.FC<{ name: string; wardNo: string; priority: string; startDate: string; endDate: string }> = ({ name, wardNo, priority, startDate, endDate }) => (
  <tr className="border-b">
    <td className="py-2">{name}</td>
    <td className="py-2">{wardNo}</td>
    <td className="py-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        priority === 'High' ? 'bg-red-200 text-red-800' :
        priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
        'bg-green-200 text-green-800'
      }`}>
        {priority}
      </span>
    </td>
    <td className="py-2">{startDate}</td>
    <td className="py-2">{endDate}</td>
  </tr>
);

const ScheduleItem: React.FC<{ time: string; task: string }> = ({ time, task }) => (
  <div className="flex">
    <span className="w-32 text-gray-600">{time}</span>
    <span>{task}</span>
  </div>
);

export default Dashboard;