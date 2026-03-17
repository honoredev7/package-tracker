import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const DriverMap = ({ from, to, current }) => {
	if (!from || !to) return null;

	const path = [
		[from.lat, from.lng],
		[to.lat, to.lng],
	];

	return (
		<div className="h-96 w-full rounded-xl overflow-hidden shadow-md">
			<MapContainer
				center={[current?.lat || from.lat, current?.lng || from.lng]}
				zoom={7}
				scrollWheelZoom={false}
				className="h-full w-full"
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					attribution="&copy; OpenStreetMap"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker position={[from.lat, from.lng]}>
					<Popup>Pickup Location</Popup>
				</Marker>

				<Marker position={[to.lat, to.lng]}>
					<Popup>Destination</Popup>
				</Marker>

				{current && (
					<Marker position={[current.lat, current.lng]}>
						<Popup>Your Current Location</Popup>
					</Marker>
				)}

				<Polyline positions={path} />
			</MapContainer>
		</div>
	);
}

export default DriverMap
