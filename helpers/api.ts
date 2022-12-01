import axios from "axios";

export { api };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
