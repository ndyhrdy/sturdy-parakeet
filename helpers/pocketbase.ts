import axios from "axios";
import PocketBase from "pocketbase";

export { pb, pbApi };

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_BASE_URL);

const pbApi = axios.create({
  baseURL: import.meta.env.VITE_POCKETBASE_BASE_URL,
});
