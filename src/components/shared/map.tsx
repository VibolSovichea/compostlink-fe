import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const position: [number, number] = [51.505, -0.09]; // Default location (London)

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-80 h-64 mt-6 rounded-xl"
      style={{ height: "256px", width: "100%" }} // Ensure it has a fixed height
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Current Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
