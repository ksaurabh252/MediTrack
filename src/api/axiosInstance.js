import axios from "axios";

const BASE_URL = "https://unit-4-7dc0a-default-rtdb.firebaseio.com";

// Create central axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: If tokens are used (future-ready for Auth)
api.interceptors.request.use(
  (config) => {
    // Example: attach token if available
    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses & errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("📡 API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
