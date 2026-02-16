import express from "express";

const router = express.Router();

router.get("/", getPackages);

router.get("/:id", getPackageById);

router.post("/", createPackage);

router.put("/:id", updatePackage);

router.delete("/:id", deletePackage);

export default router;
