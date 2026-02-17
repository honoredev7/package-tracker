import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminDashboard, DriverDashboard, CustomerDashboard, NotFound, Login } from "./pages";
import {
	ProtectedRoute,
	DashboardLayout,
	RootRedirect,
	PackagesList,
	DeliveriesList,
	CreatePackage,
	CreateDelivery
} from "./components";

const App = () => (
	<AuthProvider>
		<BrowserRouter>
			<Routes>

  				<Route path="/" element={<RootRedirect />} />

				<Route path="/login" element={<Login />} />

				{/* Routes protégées avec layout */}
				<Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

					<Route
						path="/admin"
						element={
							<ProtectedRoute role="admin">
								<AdminDashboard />
							</ProtectedRoute>
						}
					>
						<Route path="packages" element={<PackagesList />} />
						<Route path="deliveries" element={<DeliveriesList />} />
						<Route path="create-package" element={<CreatePackage />} />
						<Route path="create-delivery" element={<CreateDelivery />} />
					</Route>

					<Route
						path="/driver"
						element={
							<ProtectedRoute role="driver">
								<DriverDashboard />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/customer"
						element={
							<ProtectedRoute role="customer">
								<CustomerDashboard />
							</ProtectedRoute>
						}
					/>
				
				</Route>

				<Route path="*" element={<NotFound />} />

			</Routes>
		</BrowserRouter>
	</AuthProvider>
);

export default App;
