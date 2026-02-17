import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	if (!user) return null;

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
			<div className="text-lg font-semibold text-gray-700">
				Package Tracker
			</div>

			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-600 capitalize">
					{user.role}
				</span>

				<button
					onClick={handleLogout}
					className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg transition"
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Navbar
