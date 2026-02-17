import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const RootRedirect = () => {
	const { user } = useContext(AuthContext);

	console.log(user)

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	switch (user.role) {
		case "admin":
			return <Navigate to="/admin" replace />;
		case "driver":
			return <Navigate to="/driver" replace />;
		case "customer":
			return <Navigate to="/customer" replace />;
		default:
			return <Navigate to="/login" replace />;
	}
}

export default RootRedirect
