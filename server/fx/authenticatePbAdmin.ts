import { pbApiPublic } from "../../helpers/pocketbase-server";

export { authenticatePbAdmin };

const authenticatePbAdmin = async () => {
  const { data } = await pbApiPublic.post<{ token: string }>(
    "/api/admins/auth-with-password",
    {
      identity: process.env.POCKETBASE_ADMIN_IDENTITY,
      password: process.env.POCKETBASE_ADMIN_PASSWORD,
    }
  );
  return data.token;
};
