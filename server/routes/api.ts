import { Router } from "express";
import { chargeController } from "../controllers/charge";
import { vaController } from "../controllers/va";

export { router };

const router = Router();

router.use("/payment/charge", chargeController);
router.use("/payment/va", vaController);
