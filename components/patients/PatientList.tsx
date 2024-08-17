// components/patients/PatientList.tsx
import React from 'react';
import { Patient } from '@/utils/patientApi';
import PatientItem from './PatientItem';

interface PatientListProps {
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  onPatientUpdated: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onEditPatient, onPatientUpdated }) => {
  return (
    <div className="mt-8 space-y-6">
      {patients.map((patient) => (
        <PatientItem
          key={patient.id}
          patient={patient}
          onEditPatient={onEditPatient}
          onPatientUpdated={onPatientUpdated}
        />
      ))}
    </div>
  );
};

export default PatientList;