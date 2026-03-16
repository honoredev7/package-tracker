import { useEffect, useState } from "react";
import api from "../../api/axios";

const DeliveriesList = () => {
	const [deliveries, setDeliveries] = useState([]);

	useEffect(() => {
		const fetchDeliveries = async () => {
			const res = await api.get("/api/delivery", { withCredentials: true });
			setDeliveries(res.data);
		};
		fetchDeliveries();
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Deliveries</h1>

			<div className="bg-white shadow rounded-xl overflow-hidden">
				<table className="w-full text-left">
					<thead className="bg-gray-200">
						<tr>
							<th className="p-4">Delivery ID</th>
							<th className="p-4">Package</th>
							<th className="p-4">Status</th>
							<th className="p-4">Created At</th>
						</tr>
					</thead>

					<tbody>
						{deliveries.map((delivery) => (
							<tr key={delivery._id} className="border-t hover:bg-gray-50">
								<td className="p-4">{delivery._id}</td>
								<td className="p-4">
									{delivery.package?.description}
								</td>
								<td className="p-4">
									<span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
										{delivery.status}
									</span>
								</td>
								<td className="p-4">
									{new Date(delivery.createdAt).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default DeliveriesList;
