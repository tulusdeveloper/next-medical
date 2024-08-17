// app/home/patients/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { withAuthClient } from '@/utils/withAuthClient';
import { patientApi, Patient } from '@/utils/patientApi';
import PatientList from '@/components/patients/PatientList';
import CreatePatientForm from '@/components/patients/CreatePatientForm';
import Modal from '@/components/patients/Modal';
import EditPatientForm from '@/components/patients/EditPatientForm';

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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
    setIsCreateModalOpen(false);
  };

  const handlePatientUpdated = () => {
    fetchPatients();
    setSelectedPatient(null);
  };

  if (isLoading) return <div className="text-center py-4 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Patients</h1>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Patient
      </button>
      <PatientList
        patients={patients}
        onEditPatient={setSelectedPatient}
        onPatientUpdated={handlePatientUpdated}
      />
      
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Patient">
        <CreatePatientForm onPatientCreated={handlePatientCreated} />
      </Modal>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Edit Patient">
        {selectedPatient && (
          <EditPatientForm
            patient={selectedPatient}
            onPatientUpdated={handlePatientUpdated}
            onCancel={() => setSelectedPatient(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default withAuthClient(PatientsPage);