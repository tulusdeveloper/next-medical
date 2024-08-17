// app/home/patients/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { withAuthClient } from "@/utils/withAuthClient";
import { patientApi, Patient } from "@/utils/patientApi";
import PatientList from "@/components/patients/PatientList";
import PatientForm from "@/components/patients/PatientForm";
import Modal from "@/components/patients/Modal";

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const data = await patientApi.getPatients();
      setPatients(data);
    } catch (err) {
      setError("Failed to fetch patients. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSubmitted = () => {
    fetchPatients();
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Patients</h1>
      {error && <div className="text-center py-4 text-red-500 font-semibold">Error: {error}</div>}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Patient
      </button>
      {isLoading ? (
        <div className="text-center py-4 text-lg font-semibold text-slate-800">Loading...</div>
      ) : (
        <PatientList
          patients={patients}
          onEditPatient={(patient) => {
            setSelectedPatient(patient);
            setIsModalOpen(true);
          }}
          onPatientUpdated={fetchPatients}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setSelectedPatient(null);
      }} title={selectedPatient ? "Edit Patient" : "Create Patient"}>
        <PatientForm
          patient={selectedPatient || undefined}
          onSubmit={handlePatientSubmitted}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default withAuthClient(PatientsPage);