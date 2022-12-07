import axios from "axios";

export { pbApi, pbApiPublic };

const pbApiPublic = axios.create({
  baseURL: process.env.VITE_POCKETBASE_BASE_URL,
});

const pbApi = (token: string) =>
  axios.create({
    baseURL: process.env.VITE_POCKETBASE_BASE_URL,
    headers: {
      Authorization: token,
    },
  });
