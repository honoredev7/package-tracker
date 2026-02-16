import express from "express";
import { createDelivery, deleteDelivery, getDeliveries, getDeliveryById, updateDelivery } from "../controllers/delivery.controller";

const router = express.Router();

router.get("/", getDeliveries);

router.get("/:id", getDeliveryById);

router.post("/", createDelivery);

router.put("/:id", updateDelivery);

router.delete("/:id", deleteDelivery);

export default router;