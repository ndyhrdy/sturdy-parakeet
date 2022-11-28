import PocketBase from "pocketbase";

export { pb };

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_BASE_URL);
