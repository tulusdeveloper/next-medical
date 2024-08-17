"use client";
import React, { useState, useEffect } from "react";
import insuranceApi, { Insurance } from "@/utils/insuranceApi";
import InsuranceModal from "@/components/insurance/InsuranceModal";
import InsuranceList from "@/components/insurance/InsuranceList";

const InsurancePage: React.FC = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [filteredInsurances, setFilteredInsurances] = useState<Insurance[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Insurance>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const data = await insuranceApi.getInsurances();
        setInsurances(data);
        setFilteredInsurances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInsurances();
  }, []);

  useEffect(() => {
    let result = [...insurances];
    if (searchTerm) {
      result = result.filter((insurance) =>
        insurance.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result = result.sort((a, b) => {
      const aValue = a[sortField] ?? "";
      const bValue = b[sortField] ?? "";
  
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredInsurances(result);
  }, [searchTerm, sortField, sortOrder, insurances]);
  

  const handleEdit = (insurance: Insurance) => {
    if (insurance) {
      setSelectedInsurance(insurance);
      setShowModal(true);
    }
  };
  

  const handleCreate = () => {
    setSelectedInsurance(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedInsurance(null);
  };

  const handleInsuranceUpdated = (updatedInsurance: Insurance | undefined) => {
    if (updatedInsurance) {
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
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await insuranceApi.deleteInsurance(id);
      setInsurances((prev) => prev.filter((ins) => ins.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Insurance Management</h1>
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Insurance
        </button>
      </div>
      <InsuranceList
        insurances={filteredInsurances}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
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
