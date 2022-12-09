import { Request, Response, Router } from "express";
import { getPendingOrder } from "../fx/getPendingOrder";
import { pbApi } from "../../helpers/pocketbase-server";
import { setOrderPaidByQrCode } from "../fx/setOrderPaidByQrCode";
import { createQrCode } from "../fx/createQrCode";
import { setOrderQrCode } from "../fx/setOrderQrCode";

export { qrController };

const qrController = Router();

qrController.post("/callback", async (req: Request, res: Response) => {
  const orderId = req.body.external_id;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(pbApi(req.pbAdminToken), orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    await setOrderPaidByQrCode(pbApi(req.pbAdminToken), order, req.body);
  } catch (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send();
});

qrController.post("/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(pbApi(req.pbAdminToken), orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    const createQrCodeResponse = await createQrCode(order);
    await setOrderQrCode(pbApi(req.pbAdminToken), order, createQrCodeResponse);
  } catch (error) {
    res.status(500).send("Failed to create QR code. Please try again.");
    return;
  }
  res.status(200).send("QR code created!");
});
