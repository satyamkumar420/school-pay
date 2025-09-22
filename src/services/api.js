import axios from "axios";

// 🎯 Create a new axios instance with a custom configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 🚀 Get the base URL from environment variables
});

// 🔄 Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 🔍 Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✨ Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
