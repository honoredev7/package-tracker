import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await api.post("/api/auth/login", { email, password });
			console.log(res.data)
			
			setUser(res.data);
	
			if (res.data.role === "admin") navigate("/admin/packages");
			if (res.data.role === "driver") navigate("/driver");
			if (res.data.role === "customer") navigate("/customer");
			
		} catch (error) {
			setError("Invalid email or password");
			console.error(error);
		}

	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700 px-4">
      
			<div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
				
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
					Login
				</h2>

				{error && (
				<div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
					{error}
				</div>
				)}

				<form onSubmit={handleLogin} className="space-y-5">
				
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">
						Email
					</label>
					<input
					type="email"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
					placeholder="example@mail.com"
					onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">
						Password
					</label>
					<input
					type="password"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
					placeholder="•••••••"
					onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
				>
					Sign In
				</button>
				</form>

				<p className="text-center text-sm text-gray-500 mt-6">
					Package Tracker System
				</p>
			</div>

		</div>
	);
}

export default Login;
