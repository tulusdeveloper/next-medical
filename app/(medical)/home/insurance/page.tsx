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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const data = await insuranceApi.getInsurances();
        setInsurances(data);
        setFilteredInsurances(data);
      } catch (error) {
        setErrorMessage("Failed to fetch insurances.");
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (feedbackMessage || errorMessage) {
      timeoutId = setTimeout(() => {
        setFeedbackMessage(null);
        setErrorMessage(null);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [feedbackMessage, errorMessage]);

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

  const handleInsuranceUpdated = (updatedInsurance: Insurance | undefined) => {
    if (updatedInsurance) {
      if (selectedInsurance) {
        setInsurances((prev) =>
          prev.map((ins) => (ins.id === updatedInsurance.id ? updatedInsurance : ins))
        );
        setFeedbackMessage("Insurance updated successfully!");
      } else {
        setInsurances((prev) => [...prev, updatedInsurance]);
        setFeedbackMessage("Insurance created successfully!");
      }
      handleModalClose();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await insuranceApi.deleteInsurance(id);
      setInsurances((prev) => prev.filter((ins) => ins.id !== id));
      setFeedbackMessage("Insurance deleted successfully!");
    } catch (error) {
      setErrorMessage("Failed to delete insurance.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Insurance Management</h1>
      {(feedbackMessage || errorMessage) && (
        <div className={`mb-4 p-3 rounded-lg ${feedbackMessage ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedbackMessage || errorMessage}
        </div>
      )}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search insurances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
        >
          Add New Insurance
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