import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const fetchUser = async () => {
		try {
			const res = await api.get("/api/auth/check");
			setUser(res.data);
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;