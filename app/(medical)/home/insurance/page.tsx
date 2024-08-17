"use client";
import React, { useState, useEffect } from "react";
import insuranceApi, { Insurance } from "@/utils/insuranceApi";
import InsuranceModal from "@/components/insurance/InsuranceModal";
import InsuranceList from "@/components/insurance/InsuranceList";

const InsurancePage: React.FC = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const data = await insuranceApi.getInsurances();
        setInsurances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInsurances();
  }, []);

  const handleEdit = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedInsurance(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedInsurance(null);
  };

  const handleInsuranceUpdated = (updatedInsurance: Insurance) => {
    if (selectedInsurance) {
      // Update existing insurance
      setInsurances((prev) =>
        prev.map((ins) => (ins.id === updatedInsurance.id ? updatedInsurance : ins))
      );
    } else {
      // Add new insurance
      setInsurances((prev) => [...prev, updatedInsurance]);
    }
    handleModalClose();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Insurance Management</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mb-4"
      >
        Add Insurance
      </button>
      <InsuranceList insurances={insurances} onEdit={handleEdit} />
      {showModal && (
        <InsuranceModal
          insurance={selectedInsurance}
          onClose={handleModalClose}
          onInsuranceUpdated={handleInsuranceUpdated}
        />
      )}
    </div>
  );
};

export default InsurancePage;
