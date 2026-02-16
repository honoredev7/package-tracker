import express from "express";
import cors from "cors";

import packageRoutes from "./routes/package.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/package", packageRoutes);
app.use("/api/delivery", deliveryRoutes);

export default app;
