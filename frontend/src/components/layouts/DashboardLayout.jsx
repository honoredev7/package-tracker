import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const DashboardLayout = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<div className="p-8">
				<Outlet />
			</div>
		</div>
	);
}

export default DashboardLayout
