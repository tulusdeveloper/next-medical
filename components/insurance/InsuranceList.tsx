import React from "react";
import { Insurance } from "@/utils/insuranceApi";

interface InsuranceListProps {
  insurances: Insurance[];
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: number) => void;
  sortField: keyof Insurance;
  setSortField: (field: keyof Insurance) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}

const InsuranceList: React.FC<InsuranceListProps> = ({
  insurances,
  onEdit,
  onDelete,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  const handleSort = (field: keyof Insurance) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const confirmDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this insurance?")) {
      onDelete(id);
    }
  };

  const renderSortIcon = (field: keyof Insurance) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6">Insurance List</h2>
      {insurances.length === 0 ? (
        <p className="text-gray-500 p-6">No insurance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {["id", "name", "policy_number", "coverage_details"].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field as keyof Insurance)}
                    className="cursor-pointer p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {field.replace("_", " ")} {renderSortIcon(field as keyof Insurance)}
                  </th>
                ))}
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {insurances.map((insurance) => (
                <tr key={insurance.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{insurance.id}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{insurance.name}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{insurance.policy_number}</td>
                  <td className="p-4 text-sm text-gray-700">{insurance.coverage_details}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(insurance)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => insurance.id !== undefined && confirmDelete(insurance.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InsuranceList;