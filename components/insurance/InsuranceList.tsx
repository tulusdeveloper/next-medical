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
  
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Insurance List</h2>
        {insurances.length === 0 ? (
          <p className="text-gray-500">No insurance records found.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className="cursor-pointer p-2 text-gray-600 font-bold"
                >
                  ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="cursor-pointer p-2 text-gray-600 font-bold"
                >
                  Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => handleSort("policy_number")}
                  className="cursor-pointer p-2 text-gray-600 font-bold"
                >
                  Policy Number {sortField === "policy_number" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => handleSort("coverage_details")}
                  className="cursor-pointer p-2 text-gray-600 font-bold"
                >
                  Coverage Details {sortField === "coverage_details" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-2 text-gray-600 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {insurances.map((insurance) => (
                <tr key={insurance.id} className="bg-white border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-2 text-gray-800">{insurance.id}</td>
                  <td className="p-2 text-gray-800">{insurance.name}</td>
                  <td className="p-2 text-gray-800">{insurance.policy_number}</td>
                  <td className="p-2 text-gray-800">{insurance.coverage_details}</td>
                  <td className="p-2">
                    <button
                      onClick={() => insurance.id && onEdit(insurance)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => insurance.id && onDelete(insurance.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default InsuranceList;
  