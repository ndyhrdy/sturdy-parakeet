import axios from "axios";

export { pbApi };

const pbApi = axios.create({
  baseURL: process.env.VITE_POCKETBASE_BASE_URL,
});
