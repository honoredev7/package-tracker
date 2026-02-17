const DriverDeliveryInfo = ({ delivery, pkg }) => (
	<div className="bg-white p-6 rounded-xl shadow-md space-y-2">
		<h3 className="text-xl font-semibold mb-4">Delivery Details</h3>

		<p><span className="font-medium">Status:</span> {delivery.status}</p>
		<p><span className="font-medium">Package:</span> {pkg.description}</p>
		<p><span className="font-medium">From:</span> {pkg.from_address}</p>
		<p><span className="font-medium">To:</span> {pkg.to_address}</p>
	</div>
);

export default DriverDeliveryInfo;
