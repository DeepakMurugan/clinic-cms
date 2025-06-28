// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // must match backend prefix
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
