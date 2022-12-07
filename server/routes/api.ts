import { Router } from "express";
import { chargeController } from "../controllers/charge";
import { ewalletController } from "../controllers/ewallet";
import { orderController } from "../controllers/order";
import { roController } from "../controllers/ro";
import { vaController } from "../controllers/va";

export { router };

const router = Router();

router.use("/orders", orderController);
router.use("/payment/charge", chargeController);
router.use("/payment/ewallet", ewalletController);
router.use("/payment/ro", roController);
router.use("/payment/va", vaController);
