import axios from "axios";

// Use your backend server's base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Change port if your backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;