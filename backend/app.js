import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

import packageRoutes from "./routes/package.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { isAuthenticated } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Package Tracker API" });
});

app.set("trust proxy", 1);

app.use(
	session({
		secret: "super-secret-key",

		resave: false,
		saveUninitialized: false,
		rolling: true,

		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			ttl: 60 * 60 * 2,
		}),

		cookie: {
			maxAge: 1000 * 60 * 60 * 2,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		},
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/package", isAuthenticated, packageRoutes);
app.use("/api/delivery", isAuthenticated, deliveryRoutes);

export default app;

