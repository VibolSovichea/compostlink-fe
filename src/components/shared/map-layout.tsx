"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MButton from "../m-ui/m-button";
import { getFullAddressFromCoords } from "@/utils/getAddress"; // Import address fetching function

const customIcon = L.icon({
  iconUrl: "/assets/pin.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function CompostLinkMap({
  onConfirm,
}: {
  onConfirm: (lat: number, lng: number, address: string) => void;
}) {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    11.5564, 104.9282,
  ]); // Default: Phnom Penh
  const [address, setAddress] = useState<string>("Fetching address...");

  // Fetch address when marker moves
  useEffect(() => {
    async function fetchAddress() {
      const fetchedAddress = await getFullAddressFromCoords(
        markerPosition[0],
        markerPosition[1]
      );
      setAddress(fetchedAddress);
    }
    fetchAddress();
  }, [markerPosition]);

  // Event handler to update marker position when map is dragged
  const MapEventHandler = () => {
    useMapEvents({
      moveend: (event) => {
        const newCenter = event.target.getCenter();
        setMarkerPosition([newCenter.lat, newCenter.lng]);
      },
    });
    return null;
  };

  return (
    <div className="relative aspect-square flex flex-col gap-base">
      <MapContainer
        center={markerPosition}
        zoom={12}
        className="size-full rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventHandler />
        <Marker 
          position={markerPosition} 
          icon={customIcon}
        >
          <img src="/assets/pin.png" alt="" className="w-10 h-10 absolute " />
          <Popup>
            📍 <strong>Lat:</strong> {markerPosition[0]} <br />
            📍 <strong>Lng:</strong> {markerPosition[1]} <br />
            📍 <strong>Address:</strong> {address}
          </Popup>
        </Marker>
      </MapContainer>

      <MButton
        variant="primary"
        full
        onClick={() => onConfirm(markerPosition[0], markerPosition[1], address)}
      >
        Confirm Location
      </MButton>
    </div>
  );
}
