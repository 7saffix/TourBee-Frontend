import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Basic interceptor for logging errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      `[API ERROR]: ${error.response?.data?.message || "Server Error"}`,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
