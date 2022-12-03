import axios from "axios";

export { xenditApi };

const apiKey = process.env.XENDIT_API_KEY;

const getAuthorizationHeader = () => {
  const basicAuthString = `${apiKey}:`;
  const base64String = Buffer.from(basicAuthString).toString("base64");
  return `Basic ${base64String}`;
};

const xenditApi = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    authorization: getAuthorizationHeader(),
  },
});
