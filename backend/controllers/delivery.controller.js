import { HttpStatusCodes } from "../enums/http.enums.js";
import Delivery from "../models/delivery.model.js";
import { updateDeliveryStatus } from "../services/delivery.service.js";

export const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find().populate("package");

        res.status(HttpStatusCodes.OK).json(deliveries);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id).populate("package");

        res.status(HttpStatusCodes.OK).json(delivery);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const createDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.create(req.body);

        res.status(HttpStatusCodes.CREATED).json(delivery);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const updateDelivery = async (req, res) => {
    const { status, ...updateData } = req.body;
    try {
        const delivery = await Delivery.findByIdAndUpdate(req.params.id, { ...updateData }, { new: true });

        const updatedDelivery = await updateDeliveryStatus(delivery._id, status);

        res.status(HttpStatusCodes.OK).json(updatedDelivery);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteDelivery = async (req, res) => {
    try {
        await Delivery.findByIdAndDelete(req.params.id);

        res.status(HttpStatusCodes.OK).json({ message: "Delivery deleted successfully" });
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};