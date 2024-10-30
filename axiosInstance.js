import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use the environment variable
    withCredentials: true,
  });
  
// Optionally, add an interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
      console.error('API error:', error);
      return Promise.reject(error);
  }
);


  export default axiosInstance;