import { Request, Response, Router } from "express";
import { upperCase } from "lodash";
import { createEwalletRedirectionCharge } from "../fx/createEwalletRedirectionCharge";
import { createOvoCharge } from "../fx/createOvoCharge";
import { getPendingOrder } from "../fx/getPendingOrder";
import { setOrderPaidByEwallet } from "../fx/setOrderPaidByEwallet";

export { ewalletController };

const ewalletController = Router();

ewalletController.post("/callback", async (req: Request, res: Response) => {
  const orderId: string = req.body.data.reference_id;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    await setOrderPaidByEwallet(order, req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send();
    return;
  }
  res.status(200).send();
});

ewalletController.post("/:orderId/ovo", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    await createOvoCharge(order, req.body.phone);
  } catch (error) {
    res.status(500).send("Failed to create OVO charge. Please try again.");
    return;
  }

  res.status(200).send("OVO charge created!");
});

ewalletController.post(
  "/:orderId/redirection/:channel",
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const channel = upperCase(req.params.channel);

    let order: PendingOrder;
    try {
      order = await getPendingOrder(orderId);
    } catch (error) {
      res.status(404).send();
      return;
    }

    let createEwalletRedirectionChargeResponse;
    try {
      createEwalletRedirectionChargeResponse =
        await createEwalletRedirectionCharge(order, channel);
    } catch (error) {
      res
        .status(500)
        .send("Failed to create e-wallet charge. Please try again.");
      return;
    }

    res.status(200).send(createEwalletRedirectionChargeResponse.actions);
  }
);
