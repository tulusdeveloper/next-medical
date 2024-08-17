import React from "react";
import { Insurance } from "@/utils/insuranceApi";

interface InsuranceListProps {
  insurances: Insurance[];
  onEdit: (insurance: Insurance) => void;
}

const InsuranceList: React.FC<InsuranceListProps> = ({ insurances, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Insurance List</h2>
      {insurances.length === 0 ? (
        <p className="text-gray-500">No insurance records found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-gray-600 font-bold">ID</th>
              <th className="p-2 text-gray-600 font-bold">Name</th>
              <th className="p-2 text-gray-600 font-bold">Policy Number</th>
              <th className="p-2 text-gray-600 font-bold">Coverage Details</th>
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
                    onClick={() => onEdit(insurance)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
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
