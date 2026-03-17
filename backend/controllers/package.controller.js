import { HttpStatusCodes } from "../enums/http.enums.js";
import Package from "../models/package.model.js";
import { geocodeAddress } from "../services/geocoding.service.js";

export const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();

        res.status(HttpStatusCodes.OK).json(packages);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const getPackageById = async (req, res) => {
    try {
        const pckg = await Package.findById(req.params.id);

        res.status(HttpStatusCodes.OK).json(pckg);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const createPackage = async (req, res) => {
    const { from_address, to_address } = req.body;

    const fromCoords = await geocodeAddress(from_address);
    const toCoords = await geocodeAddress(to_address);

    try {
        const pckg = await Package.create({ ...req.body, from_location: fromCoords, to_location: toCoords });

        res.status(HttpStatusCodes.CREATED).json(pckg);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const updatePackage = async (req, res) => {
    try {
        const pckg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(HttpStatusCodes.OK).json(pckg);
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};

export const deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);

        res.status(HttpStatusCodes.OK).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(HttpStatusCodes.SERVER_ERROR).json({ message: error.message });
    }
};