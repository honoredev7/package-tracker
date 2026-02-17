import mongoose from "mongoose";
import { UserRoles } from "../enums/roles.enums.js";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },

	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email already in use"],
	},

	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
	},

	role: {
		type: String,
		enum: [UserRoles.CUSTOMER, UserRoles.DRIVER, UserRoles.ADMIN],
		required: [true, "Role is required"],
	},
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
