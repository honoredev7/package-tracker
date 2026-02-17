import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => (
	<div className="flex min-h-screen bg-gray-100">

		{/* Sidebar */}
		<div className="w-64 bg-white shadow-lg p-6 space-y-4">
			<h2 className="text-xl font-bold mb-6">Admin Panel</h2>

			<NavLink
				to="packages"
				className={({ isActive }) =>
					`block px-4 py-2 rounded-lg ${
						isActive ? "bg-green-600 text-white" : "hover:bg-gray-200"
					}`
				}
			>
				Packages
			</NavLink>

			<NavLink
				to="deliveries"
				className={({ isActive }) =>
					`block px-4 py-2 rounded-lg ${
						isActive ? "bg-green-600 text-white" : "hover:bg-gray-200"
					}`
				}
			>
				Deliveries
			</NavLink>

			<NavLink
				to="create-package"
				className={({ isActive }) =>
					`block px-4 py-2 rounded-lg ${
						isActive ? "bg-green-600 text-white" : "hover:bg-gray-200"
					}`
				}
			>
				Create Package
			</NavLink>

			<NavLink
				to="create-delivery"
				className={({ isActive }) =>
					`block px-4 py-2 rounded-lg ${
						isActive ? "bg-green-600 text-white" : "hover:bg-gray-200"
					}`
				}
			>
				Create Delivery
			</NavLink>
		</div>

		{/* Content */}
		<div className="flex-1 p-8">
			<Outlet />
		</div>
	</div>
)

export default AdminLayout
