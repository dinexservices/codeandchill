import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response) {
            // Server responded with error status
            return Promise.reject(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            // Request made but no response
            return Promise.reject('Network error. Please check your connection.');
        } else {
            // Something else happened
            return Promise.reject(error.message);
        }
    }
);

export default api;
