import { Request, Response, Router } from "express";
import { createPaymentCode } from "../fx/createPaymentCode";
import { getPendingOrder } from "../fx/getPendingOrder";
import { setOrderPaidByPaymentCode } from "../fx/setOrderPaidByPaymentCode";
import { setOrderPaymentCode } from "../fx/setOrderPaymentCode";

export { roController };

const roController = Router();

roController.post("/callback", async (req: Request, res: Response) => {
  const orderId = req.body.external_id;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    await setOrderPaidByPaymentCode(order, req.body);
  } catch (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send();
});

roController.post("/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  const roName = req.body.roName;
  if (order.paymentCodes?.[roName]) {
    res.status(201).send(order.paymentCodes[roName]);
    return;
  }

  try {
    const createPaymentCodeResponse = await createPaymentCode(order, roName);
    await setOrderPaymentCode(order, roName, createPaymentCodeResponse);
  } catch (error) {
    res.status(500).send("Failed to create payment code. Please try again.");
    return;
  }
  res.status(200).send("Payment code created!");
});
