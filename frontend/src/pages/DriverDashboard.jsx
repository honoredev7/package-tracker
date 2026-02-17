import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import DriverMap from "../components/DriverMap";
import DriverDeliveryInfo from "../components/DriverDeliveryInfo";

const DriverDashboard = () => {
	const [deliveryId, setDeliveryId] = useState("");
	const [delivery, setDelivery] = useState(null);
	const [pkg, setPkg] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);

	const socketRef = useRef(null);
	const intervalRef = useRef(null);

	const loadDelivery = async () => {
		try {
			const deliveryRes = await api.get(`/api/delivery/${deliveryId}`);
			setDelivery(deliveryRes.data);

			const packageRes = await api.get(
				`/api/package/${deliveryRes.data.package}`
			);

			setPkg(packageRes.data);

			// WebSocket connection
			const socket = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);

			socketRef.current = socket;

		} catch (err) {
			alert("Delivery not found");
		}
	};

	// Get browser location
	const startTracking = () => {
		if (!navigator.geolocation) {
			alert("Geolocation not supported");
			return;
		}

		intervalRef.current = setInterval(() => {
			navigator.geolocation.getCurrentPosition((position) => {
				const coords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				setCurrentLocation(coords);

				// Send websocket event
				if (socketRef.current?.readyState === 1) {
					socketRef.current.send(
						JSON.stringify({
							event: "location_changed",
							delivery_id: delivery._id,
							location: coords,
						})
					);
				}
			});
		}, 20000); // 20 seconds
	};

	useEffect(() => {
		if (delivery) {
			startTracking();
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (socketRef.current) socketRef.current.close();
		};
	}, [delivery]);

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-6xl mx-auto space-y-8">

				<h1 className="text-3xl font-bold text-gray-800">
					Driver Dashboard
				</h1>

				{/* Search */}
				<div className="flex gap-4">
					<input
						type="text"
						placeholder="Enter Delivery ID"
						className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						value={deliveryId}
						onChange={(e) => setDeliveryId(e.target.value)}
					/>

					<button
						onClick={loadDelivery}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Load Delivery
					</button>
				</div>

				{delivery && pkg && (
					<>
						<DriverDeliveryInfo delivery={delivery} pkg={pkg} />

						<DriverMap
							from={pkg.from_location}
							to={pkg.to_location}
							current={currentLocation}
						/>
					</>
				)}

			</div>
		</div>
	);
}

export default DriverDashboard;
