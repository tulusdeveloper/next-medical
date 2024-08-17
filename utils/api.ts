// utils/api.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('token/', { username, password });
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

export const verifyToken = async () => {
  try {
    const response = await api.post('token/verify/');
    return response.data;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    return access;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

export default api;