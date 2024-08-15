// utils/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/api/token/', { username, password });
    const { access, refresh } = response.data;

    // Store both access and refresh tokens
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    // Set the default Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle specific error cases
      if (error.response.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('An error occurred during login');
      }
    } else {
      throw new Error('Network error');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  delete api.defaults.headers.common['Authorization'];
};

export default api;
