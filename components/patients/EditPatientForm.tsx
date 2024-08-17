// components/patients/EditPatientForm.tsx
"use client";
import React, { useState } from "react";
import { patientApi, Patient } from "@/utils/patientApi";

interface EditPatientFormProps {
  patient: Patient;
  onPatientUpdated: () => void;
  onCancel: () => void;
}

const EditPatientForm: React.FC<EditPatientFormProps> = ({
  patient,
  onPatientUpdated,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Patient>(patient);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await patientApi.updatePatient(patient.id!, formData);
      onPatientUpdated();
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange as any}
        className="w-full p-2 border border-gray-300 rounded"
        required
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="tel"
        name="primary_phone"
        value={formData.primary_phone}
        onChange={handleChange}
        placeholder="Primary Phone"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="next_of_kin_name"
        value={formData.next_of_kin_name}
        onChange={handleChange}
        placeholder="Next of Kin Name"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="tel"
        name="next_of_kin_contact"
        value={formData.next_of_kin_contact}
        onChange={handleChange}
        placeholder="Next of Kin Contact"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="next_of_kin_relationship"
        value={formData.next_of_kin_relationship}
        onChange={handleChange}
        placeholder="Next of Kin Relationship"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex-1"
        >
          Update Patient
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPatientForm;
