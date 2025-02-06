import axios from "axios";

const api = axios.create({
  baseURL: window.location.hostname === "10.10.2.76" ? "http://10.10.2.76:5000" : "http://localhost:5000",
});

export default api;
