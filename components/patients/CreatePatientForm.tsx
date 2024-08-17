"use client";
import React, { useState } from "react";
import { patientApi, Patient } from "@/utils/patientApi";

interface CreatePatientFormProps {
  onPatientCreated: () => void;
}

const CreatePatientForm: React.FC<CreatePatientFormProps> = ({ onPatientCreated }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await patientApi.createPatient(formData as Patient);
      onPatientCreated();
      setFormData({
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
    } catch (error) {
      alert("Failed to create patient. Please try again.");
      console.error("Failed to create patient:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6"> {/* Two columns */}
        <div className="space-y-1">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || "M"}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="primary_phone" className="block text-sm font-medium text-gray-700">Primary Phone</label>
          <input
            type="text"
            id="primary_phone"
            name="primary_phone"
            value={formData.primary_phone || ""}
            onChange={handleChange}
            placeholder="Primary Phone"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Next of Kin Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="next_of_kin_contact" className="block text-sm font-medium text-gray-700">Next of Kin Contact</label>
          <input
            type="text"
            id="next_of_kin_contact"
            name="next_of_kin_contact"
            value={formData.next_of_kin_contact || ""}
            onChange={handleChange}
            placeholder="Next of Kin Contact"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Next of Kin Relationship"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Create Patient
      </button>
    </form>
  );
};

export default CreatePatientForm;
