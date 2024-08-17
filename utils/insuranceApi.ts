import api from '@/utils/api';

// Define the Insurance interface based on the API schema
export interface Insurance {
  id?: number;
  name: string;
  policy_number: string;
  coverage_details: string;
}

// Insurance API functions
export const insuranceApi = {
  // Get all insurances
  getInsurances: async () => {
    try {
      const response = await api.get<Insurance[]>('/insurances/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch insurances');
    }
  },

  // Get a single insurance by ID
  getInsurance: async (id: number) => {
    try {
      const response = await api.get<Insurance>(`/insurances/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch insurance');
    }
  },

  // Create a new insurance
  createInsurance: async (insuranceData: Omit<Insurance, 'id'>) => {
    try {
      const response = await api.post<Insurance>('/insurances/', insuranceData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create insurance');
    }
  },

  // Update an insurance
  updateInsurance: async (id: number, insuranceData: Omit<Insurance, 'id'>) => {
    try {
      const response = await api.put<Insurance>(`/insurances/${id}/`, insuranceData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update insurance');
    }
  },

  // Partially update an insurance
  partialUpdateInsurance: async (id: number, insuranceData: Partial<Omit<Insurance, 'id'>>) => {
    try {
      const response = await api.patch<Insurance>(`/insurances/${id}/`, insuranceData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update insurance');
    }
  },

  // Delete an insurance
  deleteInsurance: async (id: number) => {
    try {
      await api.delete(`/insurances/${id}/`);
    } catch (error) {
      throw new Error('Failed to delete insurance');
    }
  }
};

export default insuranceApi;
