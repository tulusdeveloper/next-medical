// utils/patientApi.ts
import api from '@/utils/api';

// Define the Patient interface based on the API schema
export interface Patient {
    id?: number;
    first_name: string;
    other_names?: string;
    last_name: string;
    gender: 'M' | 'F' | 'O';
    date_of_birth: string;
    national_id?: string | null;
    primary_phone: string;
    secondary_phone?: string;
    email?: string;
    address: string;
    next_of_kin_name: string;
    next_of_kin_contact: string;
    next_of_kin_relationship: string;
    blood_type?: string;
    allergies?: string;
    chronic_conditions?: string;
    registration_date?: string;
    last_visit_date?: string | null;
    is_active?: boolean;
    referral_source?: string;
  }

export const patientApi = {
  // Get all patients
  getPatients: async () => {
    try {
      const response = await api.get<Patient[]>('/patients/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patients');
    }
  },

  // Get a single patient by ID
  getPatient: async (id: number) => {
    try {
      const response = await api.get<Patient>(`/patients/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patient');
    }
  },

  // Create a new patient
  createPatient: async (patientData: Omit<Patient, 'id' | 'registration_date'>) => {
    try {
      const response = await api.post<Patient>('/patients/', patientData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create patient');
    }
  },

  // Update a patient
  updatePatient: async (id: number, patientData: Omit<Patient, 'id' | 'registration_date'>) => {
    try {
      const response = await api.put<Patient>(`/patients/${id}/`, patientData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update patient');
    }
  },

  // Partially update a patient
  partialUpdatePatient: async (id: number, patientData: Partial<Omit<Patient, 'id' | 'registration_date'>>) => {
    try {
      const response = await api.patch<Patient>(`/patients/${id}/`, patientData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update patient');
    }
  },

  // Delete a patient
  deletePatient: async (id: number) => {
    try {
      await api.delete(`/patients/${id}/`);
    } catch (error) {
      throw new Error('Failed to delete patient');
    }
  }
};

export default patientApi;