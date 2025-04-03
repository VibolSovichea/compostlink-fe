"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MButton from "../m-ui/m-button";
import { getFullAddressFromCoords } from "@/utils/getAddress";
import { X } from "lucide-react";
import getCurrentLocation from "@/utils/getCurrentLocation";

// Custom component to track center position
function CenterPositionTracker({ setPosition }: { setPosition: (position: [number, number]) => void }) {
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      setPosition([center.lat, center.lng]);
    },
    zoomend: () => {
      const center = map.getCenter();
      setPosition([center.lat, center.lng]);
    }
  });

  return null;
}

export default function CompostLinkMap({
  onConfirm,
}: {
  onConfirm: (lat: number, lng: number, address: string) => void;
}) {
  const [address, setAddress] = useState<string>("Fetching address...");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [position, setPosition] = useState<[number, number]>([
    11.5564, 104.9282,
  ]); // Default: Phnom Penh
  const [key, setKey] = useState(0); // Key to force MapContainer re-render

  const updateLocation = useCallback(async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setPosition([location.latitude, location.longitude]);
        // I use this to force MapContainer to re-render so that the map is centered on the current location
        setKey(prevKey => prevKey + 1);
      }
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  }, []);

  useEffect(() => {
    updateLocation();
  }, [updateLocation]);

  // Fetch address when position changes
  useEffect(() => {
    async function fetchAddress() {
      const fetchedAddress = await getFullAddressFromCoords(
        position[0],
        position[1]
      );
      setAddress(fetchedAddress);
    }
    fetchAddress();
  }, [position]);

  return (
    <div className="flex flex-col gap-base w-full">
      <div className="relative aspect-square w-full">
        <div className="absolute inset-0">
          <MapContainer
            key={key} // Use key to force re-render
            center={position}
            zoom={12}
            className="h-full w-full rounded-lg shadow-md"
            style={{ zIndex: 1 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CenterPositionTracker setPosition={setPosition} />
          </MapContainer>
        </div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full cursor-pointer"
          style={{ zIndex: 1000 }}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <img
            src="/assets/pin.png"
            alt="Location Pin"
            width="40"
            height="40"
            style={{ display: "block" }}
          />
        </div>

        {isPopupOpen && (
          <div
            className="absolute bottom-base left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg max-w-xs w-4/5"
            style={{ zIndex: 1000 }}
          >
            <button
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsPopupOpen(false);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-sm text-text_dark">
              <p>
                📍 <strong>Lat:</strong> {position[0]} <br />
                📍 <strong>Lng:</strong> {position[1]} <br />
                📍 <strong>Address:</strong> {address}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <span className="text-text_dark text-xs text-center">
        <p>By confirming the registration, you are agreeing to the <br /> Terms and Conditions of CompostLink.</p>
      </span>

      <div className="absolute bottom-base left-0 right-0 px-base">
        <MButton
          variant="primary"
          full
          onClick={() => onConfirm(position[0], position[1], address)}
        >
          Confirm Location
        </MButton>
      </div>
    </div>
  );
}
