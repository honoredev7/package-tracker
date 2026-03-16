import { useEffect, useState } from "react";
import api from "../../api/axios";

const PackagesList = () => {
	const [packages, setPackages] = useState([]);

	useEffect(() => {
		const fetchPackages = async () => {
			const res = await api.get("/api/package", { withCredentials: true });
			setPackages(res.data);
		};
		fetchPackages();
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Packages</h1>

			<div className="bg-white shadow rounded-xl overflow-hidden">
				<table className="w-full text-left">
					<thead className="bg-gray-200">
						<tr>
							<th className="p-4">Package ID</th>
							<th className="p-4">Description</th>
							<th className="p-4">Weight</th>
							<th className="p-4">From</th>
							<th className="p-4">To</th>
							<th className="p-4">Status</th>
						</tr>
					</thead>

					<tbody>
						{packages.map((pkg) => (
							<tr key={pkg._id} className="border-t hover:bg-gray-50">
								<td className="p-4">{pkg._id}</td>
								<td className="p-4">{pkg.description}</td>
								<td className="p-4">{pkg.weight} g</td>
								<td className="p-4">{pkg.from_address}</td>
								<td className="p-4">{pkg.to_address}</td>
								<td className="p-4">
									{pkg.active_delivery_id ? (
										<span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
											In Delivery
										</span>
									) : (
										<span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
											Available
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PackagesList;