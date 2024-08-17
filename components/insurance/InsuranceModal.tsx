"use client";
import React, { useState, useEffect } from "react";
import insuranceApi, { Insurance } from "@/utils/insuranceApi";

interface InsuranceModalProps {
  insurance: Insurance | null;
  onClose: () => void;
  onInsuranceUpdated: (updatedInsurance: Insurance) => void;
}

const InsuranceModal: React.FC<InsuranceModalProps> = ({ insurance, onClose, onInsuranceUpdated }) => {
  const [formData, setFormData] = useState<Omit<Insurance, "id">>({
    name: "",
    policy_number: "",
    coverage_details: "",
  });

  useEffect(() => {
    if (insurance) {
      setFormData({
        name: insurance.name,
        policy_number: insurance.policy_number,
        coverage_details: insurance.coverage_details,
      });
    }
  }, [insurance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let updatedInsurance: Insurance;

      if (insurance) {
        updatedInsurance = await insuranceApi.updateInsurance(insurance.id!, formData);
      } else {
        updatedInsurance = await insuranceApi.createInsurance(formData);
      }

      onInsuranceUpdated(updatedInsurance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {insurance ? "Edit Insurance" : "Create Insurance"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-slate-600"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Policy Number</label>
          <input
            type="text"
            name="policy_number"
            value={formData.policy_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-slate-600"
            placeholder="Policy Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Coverage Details</label>
          <textarea
            name="coverage_details"
            value={formData.coverage_details}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-slate-600"
            placeholder="Coverage Details"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            {insurance ? "Update" : "Create"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceModal;
