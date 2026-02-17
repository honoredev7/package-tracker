import CreatePackageForm from "../components/admin/CreatePackageForm";
import CreateDeliveryForm from "../components/admin/CreateDeliveryForm";

const AdminDashboard = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-7xl mx-auto space-y-8">

				<h1 className="text-3xl font-bold text-gray-800">
						Admin Dashboard
				</h1>

				<div className="grid md:grid-cols-2 gap-8">
						<CreatePackageForm />
						<CreateDeliveryForm />
				</div>

			</div>
		</div>
	);
}

export default AdminDashboard
