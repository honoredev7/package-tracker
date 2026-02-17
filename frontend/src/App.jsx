import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
	<AuthProvider>
		<BrowserRouter>
			<Routes>

				<Route path="/login" element={<Login />} />

				<Route
					path="/admin"
					element={
						<ProtectedRoute role="admin">
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>

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

			</Routes>
		</BrowserRouter>
	</AuthProvider>
);

export default App;
