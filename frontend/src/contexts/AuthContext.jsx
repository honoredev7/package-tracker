import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkSession = async () => {
			try {
				const res = await api.get("/api/auth/check");
				setUser(res.data);
			} catch (error) {
				setUser(null);
				console.log(error)
			} finally {
				setLoading(false);
			}
		}

		checkSession();
	}, []);

	const logout = async () => {
		await api.post("/api/auth/logout");
		setUser(null);
		localStorage.removeItem("user");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
