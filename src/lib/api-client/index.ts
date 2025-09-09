import axios from 'axios';

const getBaseURL = () => {
  // Check for environment-specific API URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:5001/api';
  }

  if (import.meta.env.PROD) {
    return 'https://your-production-api.com/api';
  }

  // Default fallback
  return '/api';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
