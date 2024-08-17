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
    other_names: "",
    last_name: "",
    gender: "M",
    date_of_birth: "",
    national_id: "",
    primary_phone: "",
    secondary_phone: "",
    email: "",
    address: "",
    next_of_kin_name: "",
    next_of_kin_contact: "",
    next_of_kin_relationship: "",
    blood_type: "",
    allergies: "",
    chronic_conditions: "",
    is_active: true,
    referral_source: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-1">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="other_names" className="block text-sm font-medium text-gray-700">Other Names</label>
          <input
            type="text"
            id="other_names"
            name="other_names"
            value={formData.other_names || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || "M"}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="national_id" className="block text-sm font-medium text-gray-700">National ID</label>
          <input
            type="text"
            id="national_id"
            name="national_id"
            value={formData.national_id || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="primary_phone" className="block text-sm font-medium text-gray-700">Primary Phone</label>
          <input
            type="tel"
            id="primary_phone"
            name="primary_phone"
            value={formData.primary_phone || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="secondary_phone" className="block text-sm font-medium text-gray-700">Secondary Phone</label>
          <input
            type="tel"
            id="secondary_phone"
            name="secondary_phone"
            value={formData.secondary_phone || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="next_of_kin_name" className="block text-sm font-medium text-gray-700">Next of Kin Name</label>
          <input
            type="text"
            id="next_of_kin_name"
            name="next_of_kin_name"
            value={formData.next_of_kin_name || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="next_of_kin_contact" className="block text-sm font-medium text-gray-700">Next of Kin Contact</label>
          <input
            type="tel"
            id="next_of_kin_contact"
            name="next_of_kin_contact"
            value={formData.next_of_kin_contact || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="next_of_kin_relationship" className="block text-sm font-medium text-gray-700">Next of Kin Relationship</label>
          <input
            type="text"
            id="next_of_kin_relationship"
            name="next_of_kin_relationship"
            value={formData.next_of_kin_relationship || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700">Blood Type</label>
          <input
            type="text"
            id="blood_type"
            name="blood_type"
            value={formData.blood_type || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="chronic_conditions" className="block text-sm font-medium text-gray-700">Chronic Conditions</label>
          <textarea
            id="chronic_conditions"
            name="chronic_conditions"
            value={formData.chronic_conditions || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="referral_source" className="block text-sm font-medium text-gray-700">Referral Source</label>
          <input
            type="text"
            id="referral_source"
            name="referral_source"
            value={formData.referral_source || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="is_active" className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active || false}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Is Active</span>
          </label>
        </div>
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