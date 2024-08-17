// components/patients/PatientItem.tsx
"use client";
import React from "react";
import { Patient, patientApi } from "@/utils/patientApi";

interface PatientItemProps {
  patient: Patient;
  onEditPatient: (patient: Patient) => void;
  onPatientUpdated: () => void;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient, onEditPatient, onPatientUpdated }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete patient ${patient.first_name} ${patient.last_name}?`)) {
      try {
        await patientApi.deletePatient(patient.id!);
        onPatientUpdated();
      } catch (error) {
        alert("Failed to delete patient. Please try again.");
        console.error("Failed to delete patient:", error);
      }
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold mb-2">{`${patient.first_name} ${patient.last_name}`}</h3>
      <p className="text-gray-600 mb-1">Date of Birth: {patient.date_of_birth}</p>
      <p className="text-gray-600 mb-1">Gender: {patient.gender}</p>
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onEditPatient(patient)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientItem;
