import { Request, Response, Router } from "express";
import { pbApi } from "../../helpers/pocketbase-server";
import { chargeOrder } from "../fx/chargeOrder";
import { getPendingOrder } from "../fx/getPendingOrder";
import { setOrderPaidByCreditCard } from "../fx/setOrderPaidByCreditCard";

export { chargeController };

const chargeController = Router();

chargeController.post("/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(pbApi(req.pbAdminToken), orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    const chargeResponse = await chargeOrder(order, req.body.token);
    await setOrderPaidByCreditCard(
      pbApi(req.pbAdminToken),
      order,
      chargeResponse
    );
  } catch (error) {
    res.status(500).send("Failed to charge credit card. Please try again.");
    return;
  }
  res.status(200).send("Credit card charge successful!");
});
