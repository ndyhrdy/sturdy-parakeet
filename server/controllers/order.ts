import { Request, Response, Router } from "express";
import { pbApi } from "../../helpers/pocketbase-server";
import { createOrder } from "../fx/createOrder";

export { orderController };

const orderController = Router();

orderController.post("/", async (req: Request, res: Response) => {
  const order = await createOrder(pbApi(req.pbAdminToken));
  res.status(200).send(order);
});
