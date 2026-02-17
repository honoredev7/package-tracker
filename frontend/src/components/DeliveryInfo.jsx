const DeliveryInfo = ({ delivery }) => {
	return (
		<div className="bg-white p-6 rounded-xl shadow-md">
			<h3 className="text-xl font-semibold mb-4">Delivery Details</h3>

			<p>
				<span className="font-medium">Status:</span>{" "}
				<span className="capitalize">{delivery.status}</span>
			</p>

			{delivery.pickup_time && (
				<p>Pickup: {new Date(delivery.pickup_time).toLocaleString()}</p>
			)}

			{delivery.start_time && (
				<p>Started: {new Date(delivery.start_time).toLocaleString()}</p>
			)}

			{delivery.end_time && (
				<p>Completed: {new Date(delivery.end_time).toLocaleString()}</p>
			)}
		</div>
	);
}

export default DeliveryInfo
