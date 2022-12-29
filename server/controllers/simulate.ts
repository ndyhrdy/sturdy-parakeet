import { Request, Response, Router } from "express";
import { getPendingOrder } from "../fx/getPendingOrder";
import { pbApi } from "../../helpers/pocketbase-server";
import { simulateVirtualAccountPayment } from "../fx/simulateVirtualAccountPayment";

export { simulateController };

const simulateController = Router();

simulateController.post("/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const paymentMethod = req.body.paymentMethod;

  let order: PendingOrder;
  try {
    order = await getPendingOrder(pbApi(req.pbAdminToken), orderId);
  } catch (error) {
    res.status(404).send();
    return;
  }

  try {
    switch (paymentMethod) {
      case "va":
        await simulateVirtualAccountPayment(order);
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to simulate payment. Please try again.");
    return;
  }
  res.status(200).send("Simulation requested successfully!");
});
