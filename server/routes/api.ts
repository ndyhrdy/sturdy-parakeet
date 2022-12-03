import { Router } from "express";
import { chargeController } from "../controllers/charge";

export { router };

const router = Router();

router.post("/payment/charge/:orderId", chargeController);
