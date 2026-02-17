import { useState, useEffect } from "react";
import api from "../../api/axios";

const CreateDelivery = () => {
	const [packages, setPackages] = useState([]);
	const [selectedPackage, setSelectedPackage] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const fetchPackages = async () => {
			const res = await api.get("/api/package");
			setPackages(res.data);
		};
		fetchPackages();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await api.post("/api/delivery", {
			package: selectedPackage,
		});

		setSuccess("Delivery created successfully!");
	};

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-xl font-semibold mb-4">Create Delivery</h2>

			{success && (
				<div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg text-sm">
					{success}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">

				<select
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
					value={selectedPackage}
					onChange={(e) => setSelectedPackage(e.target.value)}
					required
				>
					<option value="">Select Package</option>
					{packages.map((pkg) => (
						<option key={pkg._id} value={pkg._id}>
							{pkg.description}
						</option>
					))}
				</select>

				<button
					type="submit"
					className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
				>
					Create Delivery
				</button>
			</form>
		</div>
	);
}

export default CreateDelivery
