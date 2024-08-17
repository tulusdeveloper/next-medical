// components/patients/PatientItem.tsx
"use client";
import React from "react";
import { Patient, patientApi } from "@/utils/patientApi";
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

interface PatientItemProps {
  patient: Patient;
  onEditPatient: (patient: Patient) => void;
  onPatientUpdated: () => void;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient, onEditPatient, onPatientUpdated }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete patient ${patient.first_name} ${patient.last_name}?`)) {
      try {
        if (patient.id) {
          await patientApi.deletePatient(patient.id);
          onPatientUpdated();
        }
      } catch (error) {
        alert("Failed to delete patient. Please try again.");
        console.error("Failed to delete patient:", error);
      }
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {patient.last_name ?? ''}, {patient.first_name ?? ''}
            </div>
            <div className="text-sm text-gray-500">{patient.primary_phone ?? 'N/A'}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{patient.date_of_birth ?? 'N/A'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEditPatient(patient)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-900"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default PatientItem;