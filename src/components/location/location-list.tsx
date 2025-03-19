import MCard from "@/components/m-ui/m-card";
import { useEffect, useMemo, useState } from "react";
import { Location } from "@/redux/slices/data.types";
import { Building2 } from "lucide-react";

interface LocationListProps {
  locations: Location[];
  onSelect: (id: string, latitude: number, longitude: number) => void;
}

export function extractMainAddress(address: Location["address"]): string {
  if (!address) return "";
  const parts = address.split(",").map((part) => part.trim());
  const startIndex = parts.findIndex((part) =>
    /(Sangkat|Khan|Phnom Penh|Province|City|District|Commune)/i.test(part)
  );

  if (startIndex === -1) return address;
  const filteredParts = parts
    .slice(startIndex)
    .filter((part) => !/^\d+$/.test(part) && part.toLowerCase() !== "cambodia");

  return filteredParts.join(", ");
}

const LocationList = ({ locations, onSelect }: LocationListProps) => {
  const [open, setOpen] = useState(false);

  const onLocationClick = (id: string, latitude: number, longitude: number) => {
    setOpen(true);
    onSelect(id, latitude, longitude);
  };

  return useMemo(() => (
    locations && (
      <div className="w-full space-y-base">
        {locations &&
          locations.map((location) => (
            <MCard
              key={location.id}
              className="flex flex-row gap-base"
              onClick={() =>
                onLocationClick(
                  location.id ?? "",
                  location.latitude,
                  location.longitude
                )
              }
            >
              <div className="aspect-square size-20">
                <Building2 className="size-full text-primary" />
              </div>
              <div className="flex flex-col justify-evenly">
                <p className="text-sm text-black font-semibold">
                  {"Facility Name"}
                </p>
                <p className="text-xs text-black">
                  {extractMainAddress(location.address)}
                </p>
              </div>
            </MCard>
          ))}
      </div>
    )
  ), [locations, onLocationClick]);
};

export default LocationList;

