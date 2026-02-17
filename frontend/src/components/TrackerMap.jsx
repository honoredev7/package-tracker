import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


export default function TrackerMap({ from, to, current }) {
  if (!from || !to) return null;

  const path = [
    [from.lat, from.lng],
    [to.lat, to.lng],
  ];

  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={[from.lat, from.lng]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Source */}
        <Marker position={[from.lat, from.lng]}>
          <Popup>Source</Popup>
        </Marker>

        {/* Destination */}
        <Marker position={[to.lat, to.lng]}>
          <Popup>Destination</Popup>
        </Marker>

        {/* Current location */}
        {current && (
          <Marker position={[current.lat, current.lng]}>
            <Popup>Current Location</Popup>
          </Marker>
        )}

        <Polyline positions={path} />
      </MapContainer>
    </div>
  );
}
