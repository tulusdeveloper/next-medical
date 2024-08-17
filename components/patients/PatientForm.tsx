// components/patients/PatientForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { patientApi, Patient } from "@/utils/patientApi";

interface PatientFormProps {
  patient?: Patient;
  onSubmit: () => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    first_name: "",
    last_name: "",
    gender: "M",
    date_of_birth: "",
    primary_phone: "",
    address: "",
    next_of_kin_name: "",
    next_of_kin_contact: "",
    next_of_kin_relationship: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (patient) {
        await patientApi.updatePatient(patient.id!, formData as Patient);
      } else {
        await patientApi.createPatient(formData as Patient);
      }
      onSubmit();
    } catch (error) {
      alert(`Failed to ${patient ? 'update' : 'create'} patient. Please try again.`);
      console.error(`Failed to ${patient ? 'update' : 'create'} patient:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Form fields go here (same as in your original CreatePatientForm and EditPatientForm) */}
        {/* ... */}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {patient ? 'Update Patient' : 'Create Patient'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PatientForm;