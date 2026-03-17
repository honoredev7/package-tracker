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

	const isPickedUpEnabled = delivery?.status === "open";
	const isInTransitEnabled = delivery?.status === "picked-up";
	const isDeliveredEnabled = delivery?.status === "in_transit";
	const isFailedEnabled = delivery?.status === "in_transit";

	const loadDelivery = async () => {
		try {
			const deliveryRes = await api.get(`/api/delivery/${deliveryId}`, { withCredentials: true });
			setDelivery(deliveryRes.data);

			const packageRes = await api.get(
				`/api/package/${deliveryRes.data.package}`,
				{ withCredentials: true }
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

	const updateStatus = async (status) => {
		try {
			const res = await api.put(
				`/api/delivery/${delivery._id}`,
				{
					...delivery,
					status,
				},
				{ withCredentials: true }
			);

			setDelivery(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const changeStatus = (status) => {
		updateStatus(status);
		if (!socketRef.current || socketRef.current.readyState !== 1) return;

		socketRef.current.send(
			JSON.stringify({
				event: "status_changed",
				delivery_id: delivery._id,
				status: status,
			})
		);

		setDelivery((prev) => ({
			...prev,
			status: status
		}));
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
						className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						value={deliveryId}
						onChange={(e) => setDeliveryId(e.target.value)}
					/>

					<button
						onClick={loadDelivery}
						className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
					>
						Load Delivery
					</button>
				</div>

				{delivery && 
					<div className="flex gap-4 flex-wrap">

						<button
							disabled={!isPickedUpEnabled}
							onClick={() => changeStatus("picked-up")}
							className={`px-4 py-2 rounded text-white ${
								isPickedUpEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
							}`}
						>
							Picked Up
						</button>

						<button
							disabled={!isInTransitEnabled}
							onClick={() => changeStatus("in_transit")}
							className={`px-4 py-2 rounded text-white ${
								isInTransitEnabled ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-400"
							}`}
						>
							In Transit
						</button>

						<button
							disabled={!isDeliveredEnabled}
							onClick={() => changeStatus("delivered")}
							className={`px-4 py-2 rounded text-white ${
								isDeliveredEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
							}`}
						>
							Delivered
						</button>

						<button
							disabled={!isFailedEnabled}
							onClick={() => changeStatus("failed")}
							className={`px-4 py-2 rounded text-white ${
								isFailedEnabled ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"
							}`}
						>
							Failed
						</button>

					</div>
				}

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
