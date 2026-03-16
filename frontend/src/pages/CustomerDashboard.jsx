import { useState, useEffect } from "react";
import api from "../api/axios";
import PackageInfo from "../components/PackageInfo";
import DeliveryInfo from "../components/DeliveryInfo";
import TrackerMap from "../components/TrackerMap";

const CustomerDashboard = () => {
	const [packageId, setPackageId] = useState("");
	const [pkg, setPkg] = useState(null);
	const [delivery, setDelivery] = useState(null);
	const [ws, setWs] = useState(null);

	const handleSearch = async () => {
		try {
			const res = await api.get(`/api/package/${packageId}`, { withCredentials: true });
			setPkg(res.data);

			if (res.data.active_delivery_id) {
				const deliveryRes = await api.get(
					`/api/delivery/${res.data.active_delivery_id}`,
					{ withCredentials: true }
				);

				setDelivery(deliveryRes.data);

				const socket = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);

				socket.onmessage = (event) => {
					const data = JSON.parse(event.data);

					if (
						data.event === "delivery_updated" &&
						data.data._id === deliveryRes.data._id
					) {
						setDelivery(data.data);
					}
				};

				setWs(socket);
			}
		} catch (err) {
			alert("Package not found");
		}
	};

	useEffect(() => {
		return () => {
			if (ws) ws.close();
		};
	}, [ws]);

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-6xl mx-auto space-y-8">

				<h1 className="text-3xl font-bold text-gray-800">
					Package Tracker
				</h1>

				{/* Search */}
				<div className="flex gap-4">
					<input
						type="text"
						placeholder="Enter Package ID"
						className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						value={packageId}
						onChange={(e) => setPackageId(e.target.value)}
					/>

					<button
						onClick={handleSearch}
						className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
					>
						Track
					</button>
				</div>

				{pkg && (
					<div className="grid md:grid-cols-2 gap-6">
						<PackageInfo pkg={pkg} />
						{delivery && <DeliveryInfo delivery={delivery} />}
					</div>
				)}

				{pkg && (
					<TrackerMap
						from={pkg.from_location}
						to={pkg.to_location}
						current={delivery?.location}
					/>
				)}

			</div>
		</div>
	);
}

export default CustomerDashboard;
