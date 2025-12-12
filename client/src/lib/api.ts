import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy handles target to http://localhost:5000
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Access Token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 (token refresh could be added here)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Simple 401 handling for now
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            // Optional: Redirect to login or refresh token logic
        }
        return Promise.reject(error);
    }
);

export default api;
