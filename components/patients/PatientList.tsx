// components/patients/PatientList.tsx
"use client";
import React, { useState, useMemo } from "react";
import { Patient } from "@/utils/patientApi";
import PatientItem from "./PatientItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PatientListProps {
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  onPatientUpdated: () => void;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onEditPatient,
  onPatientUpdated,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Patient>("last_name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const patientsPerPage = 10;

  const sortedAndFilteredPatients = useMemo(() => {
    return patients
      .filter(
        (patient) =>
          (patient.first_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ??
            false) ||
          (patient.last_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ??
            false) ||
          (patient.primary_phone?.includes(searchTerm) ?? false)
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === "asc" ? -1 : 1;
        if (bValue == null) return sortDirection === "asc" ? 1 : -1;
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [patients, sortField, sortDirection, searchTerm]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * patientsPerPage;
    return sortedAndFilteredPatients.slice(
      startIndex,
      startIndex + patientsPerPage
    );
  }, [sortedAndFilteredPatients, currentPage]);

  const totalPages = Math.ceil(
    sortedAndFilteredPatients.length / patientsPerPage
  );

  const handleSort = (field: keyof Patient) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("last_name")}
              >
                Name{" "}
                {sortField === "last_name" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date_of_birth")}
              >
                Date of Birth{" "}
                {sortField === "date_of_birth" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("gender")}
              >
                Gender{" "}
                {sortField === "gender" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPatients.map((patient) => (
              <PatientItem
                key={patient.id}
                patient={patient}
                onEditPatient={onEditPatient}
                onPatientUpdated={onPatientUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * patientsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                currentPage * patientsPerPage,
                sortedAndFilteredPatients.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {sortedAndFilteredPatients.length}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
