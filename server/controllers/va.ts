import { Request, Response, Router } from "express";
import { createVirtualAccount } from "../fx/createVirtualAccount";
import { getPendingOrder } from "../fx/getPendingOrder";
import { setOrderPaidByVirtualAccount } from "../fx/setOrderPaidByVirtualAccount";
import { setOrderVirtualAccount } from "../fx/setOrderVirtualAccount";

export { vaController };

const vaController = Router();

vaController.post("/callback", async (req: Request, res: Response) => {
  const orderId = req.body.external_id;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    await setOrderPaidByVirtualAccount(order, req.body);
  } catch (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send();
});

vaController.post("/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  const bankCode = req.body.bankCode;
  if (order.virtualAccounts?.[bankCode]) {
    res.status(201).send(order.virtualAccounts[bankCode]);
    return;
  }

  try {
    const createVirtualAccountResponse = await createVirtualAccount(
      order,
      bankCode
    );
    await setOrderVirtualAccount(order, bankCode, createVirtualAccountResponse);
  } catch (error) {
    res.status(500).send("Failed to create virtual account. Please try again.");
    return;
  }
  res.status(200).send("Virtual account created!");
});
