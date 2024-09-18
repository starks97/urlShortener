import axios from "axios";
import { baseUrl } from "./consts"; // Adjust the import path as needed

// Set default base URL for all axios requests
axios.defaults.baseURL = baseUrl;

// Automatically include credentials (cookies) with every request
axios.defaults.withCredentials = true;

// Optional: Request interceptor for modifying requests before they are sent
axios.interceptors.request.use(
  (config) => {
    // Modify config if needed (e.g., adding auth headers)
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// The response interceptor to globally handle response errors
axios.interceptors.response.use(
  (response) => {
    // Handle successful responses globally, if needed
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors globally, like redirecting to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default axios; // Optionally export if you want to use axios from this file
