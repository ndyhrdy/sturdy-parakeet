import { Router } from "express";
import { chargeController } from "../controllers/charge";
import { vaController } from "../controllers/va";
import { roController } from "../controllers/ro";

export { router };

const router = Router();

router.use("/payment/charge", chargeController);
router.use("/payment/va", vaController);
router.use("/payment/ro", roController);
