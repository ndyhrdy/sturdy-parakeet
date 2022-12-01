import { Request, Response } from "express";
import { pbApi } from "../helpers/pocketbase-server";
import { xenditApi } from "../helpers/xendit";

export { assignPaymentMethod };

const assignPaymentMethod = async (req: Request, res: Response) => {
  const orderId = req.body.reference_id;
  let order: Order;
  ({ data: order } = await pbApi.get<Order>(
    `/api/collections/orders/records/${orderId}`
  ));
  if (!order) {
    res.status(404).json({ message: "order-not-found" });
    return;
  }

  try {
    let paymentMethod;
    if (!order.paymentMethod) {
      ({ data: paymentMethod } = await xenditApi.post(
        "/v2/payment_methods",
        req.body
      ));
    } else {
      ({ data: paymentMethod } = await xenditApi.patch(
        `/v2/payment_methods/${order.paymentMethod.id}`,
        req.body
      ));
    }
    ({ data: order } = await pbApi.patch<Order>(
      `/api/collections/orders/records/${orderId}`,
      {
        paymentMethod: JSON.stringify(paymentMethod),
      }
    ));

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
