// app/home/patients/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { withAuthClient } from '@/utils/withAuthClient';
import { patientApi } from '@/utils/patientApi';
import PatientList from '@/components/patients/PatientList';
import CreatePatientForm from '@/components/patients/CreatePatientForm';

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const data = await patientApi.getPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to fetch patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientCreated = () => {
    fetchPatients();
  };

  if (isLoading) return <div className="text-center py-4 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patients</h1>
      <CreatePatientForm onPatientCreated={handlePatientCreated} />
      <PatientList patients={patients} onPatientUpdated={fetchPatients} />
    </div>
  );
};

export default withAuthClient(PatientsPage);
