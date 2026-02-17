import express from "express";
import { createDelivery, deleteDelivery, getDeliveries, getDeliveryById, updateDelivery } from "../controllers/delivery.controller.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authorizeRoles("driver", "admin"), getDeliveries);

router.get("/:id", getDeliveryById);

router.post("/", createDelivery);

router.put("/:id", updateDelivery);

router.delete("/:id", deleteDelivery);

export default router;