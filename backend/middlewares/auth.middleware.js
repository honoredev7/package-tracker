import { HttpStatusCodes } from "../enums/http.enums.js";

export const isAuthenticated = (req, res, next) => {
	if (!req.session.user) {
		return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
	}
	next();
}

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.session.user.role)) {
			return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Forbidden" });
		}
		next();
	};
}
