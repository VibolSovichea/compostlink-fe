"use client";

import Base from "@/components/shared/base-layout";
import Header from "@/components/shared/header";
import { useDropOffLocationQuery } from "@/redux/slices/dataSlice";
export default function LocationPage() {
  const { data: locations, error, isLoading } = useDropOffLocationQuery();

  const handleClick = (latitude: number, longitude: number) => {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  if (isLoading) return <p>Loading drop-off locations...</p>;
  if (error) return <p>Error fetching drop-off locations</p>;
  return (
    <Base insideClassName="items-center gap-base">
      <div className="flex flex-col gap-base">
        <h2>Drop-Off Locations</h2>
        <div className="w-80 max-w-md space-y-4">
          {locations &&
            locations.map((location) => (
              <div
                key={location.id}
                onClick={() =>
                  handleClick(location.latitude, location.longitude)
                }
                className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4"
              >
                {/* Image */}
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center"></div>

                {/* Content (Title, Description, Date) */}
                <div className="flex-1">
                  <p className="text-lg text-black font-semibold">
                    {location.address}
                  </p>

                  <ul className="text-sm text-gray-600">
                    <li>{location.latitude}</li>
                    <li>{location.longitude}</li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Base>
  );
}
