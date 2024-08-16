// components/patients/PatientItem.tsx
"use client"
import React, { useState } from 'react';
import { Patient, patientApi } from '@/utils/patientApi';
import EditPatientForm from '@/components/patients/EditPatientForm';

interface PatientItemProps {
  patient: Patient;
  onPatientUpdated: () => void;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient, onPatientUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientApi.deletePatient(patient.id!);
        onPatientUpdated();
      } catch (error) {
        console.error('Failed to delete patient:', error);
      }
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      {isEditing ? (
        <EditPatientForm
          patient={patient}
          onPatientUpdated={() => {
            setIsEditing(false);
            onPatientUpdated();
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h3 className="text-xl font-semibold">{`${patient.first_name} ${patient.last_name}`}</h3>
          <p className="text-gray-600">Date of Birth: {patient.date_of_birth}</p>
          <p className="text-gray-600">Gender: {patient.gender}</p>
          <div className="mt-4 space-x-2">
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientItem;
