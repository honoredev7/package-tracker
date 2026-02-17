import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { HttpStatusCodes } from "../enums/http.enums.js";

export const checkAuth = (req, res) => {
	if (req.session.user)
		return res.status(HttpStatusCodes.OK).json(req.session.user);

	return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Not authenticated" });
};

export const register = async (req, res) => {
	const { name, email, password, role } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		role,
	});

	res.status(HttpStatusCodes.CREATED).json(user);
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Invalid password" });

	req.session.user = {
		id: user._id,
		role: user.role,
	};

	res.status(HttpStatusCodes.OK).json({ message: "Logged in", user });
}

export const logout = (req, res) => {
	req.session.destroy(() => {
		res.status(HttpStatusCodes.OK).json({ message: "Logged out" });
	});
}