import axios from "axios";

const api = axios.create({
  baseURL: "https://lootopia-api.example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
