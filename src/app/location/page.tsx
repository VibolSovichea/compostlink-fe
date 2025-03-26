"use client";

import LocationList from "@/components/location/location-list";
import MButton from "@/components/m-ui/m-button";
import MDialog from "@/components/m-ui/m-dailog";
import Base from "@/components/shared/base-layout";
import { useDropOffLocationQuery, useProfileQuery } from "@/redux/slices/dataSlice";
import { Location } from "@/redux/slices/data.types";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Cookies from "js-cookie";
import getCurrentLocation from "@/utils/getCurrentLocation";

export default function LocationPage() {
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId || "");
  const { data: locations, isLoading } = useDropOffLocationQuery();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (location) {
        setCurrentLocation(location);
      }
    });
  }, []);

  const nearestLocation = useMemo(() => {
    if(!currentLocation || !locations) return null;

    const distance = (location: Location) => {
      const dx = currentLocation.latitude - location.latitude;
      const dy = currentLocation.longitude - location.longitude;
      return Math.sqrt(dx * dx + dy * dy);
    }

    return [...locations].sort((a, b) => distance(a) - distance(b));
  }, [currentLocation, locations]);

  const onChooseLocation = () => {
    window.open(
      `https://www.google.com/maps?q=${selectedLocation?.latitude},${selectedLocation?.longitude}`,
      "_blank"
    );
  };
  
  const handleLocationSelect = (id: string, latitude: number, longitude: number) => {
    setSelectedLocation({ id, latitude, longitude });
    setOpen(true);
  };

  // Order base on the nearest location
  return useMemo(() => (
    <Base insideClassName="flex" headerVariant="default" headerContent={{ username: userData?.name }}>
      {locations ? (
        <>
          <div className="sticky top-0 z-10">
            <ProfilePreviewCard points={userData?.totalPoint || 0} />
          </div>
          <LocationList locations={nearestLocation || []} onSelect={handleLocationSelect} />
        </>
      ) : isLoading ? (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <p className="text-primary text-sm">No locations found</p>
        </div>
      )}
      {selectedLocation && (
        <MDialog
          open={open}
          onOpenChange={(prev) => {
            setOpen(!prev);
            setSelectedLocation(null);
          }}
          header={{
            title: "Facility Name",
            description: "Facility Address",
          }}
          content={
            <div className="aspect-video size-full bg-gray-300/70 rounded-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${selectedLocation?.longitude}!3d${selectedLocation?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${selectedLocation?.latitude}%2C${selectedLocation?.longitude}!2s${selectedLocation?.latitude}%2C${selectedLocation?.longitude}!5e0!3m2!1sen!2s!4v1`}
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                className="size-full rounded-lg"
              />
            </div>
          }
          footer={
            <MButton variant="primary" full onClick={onChooseLocation}>
              Choose Location
            </MButton>
          }
        />
      )}
    </Base>
  ), [locations, selectedLocation, userData, currentLocation]);
}
