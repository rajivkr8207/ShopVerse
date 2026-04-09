import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // change to your backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;