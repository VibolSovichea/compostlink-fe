"use client";

import Base from "@/components/shared/base-layout";
import { useRegisterLocationMutation } from "@/redux/slices/dataSlice";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import CompostLinkMap from "@/components/shared/map-layout";
import Cookies from "js-cookie";
import MDialog from "@/components/m-ui/m-dailog";
import MButton from "@/components/m-ui/m-button";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  facilityId: number;
}

export default function LocationRegisterPage() {
  const facilityId = Cookies.get("user_id");
  const numericFacilityId = Number(facilityId);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [registerLocation] = useRegisterLocationMutation();

  const onConfirmLocation = useCallback(async () => {
    if (!location) return;

    try {
      const response = await registerLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        facilityId: numericFacilityId,
      });

      console.log("Mutation response:", response);
      toast.success("Location registered successfully!");
    } catch (err) {
      console.error("Failed to register location:", err);
      if (err && typeof err === "object") {
        console.error("Detailed error:", JSON.stringify(err, null, 2));
      }
      toast.error("Failed to register location. Please try again.");
    }
  }, [facilityId, numericFacilityId, registerLocation, location]);

  return (
    <Base
      headerVariant="return-button"
      headerContent={{ pageTitle: "Location Register" }}
      hideNavigation
    >
      <div className="flex flex-col gap-4 mt-16">
        <div className="text-2xl font-bold text-text_dark">Location Register</div>
        <div className="text-sm text-gray-500">
          Please fill in the following details to register your location
        </div>
        <CompostLinkMap
          onConfirm={(lat, lng, address) => {
            setLocation({
              latitude: lat,
              longitude: lng,
              address,
              facilityId: numericFacilityId,
            });
            setIsPopupOpen(true);
          }}
        />
      </div>
      <MDialog
        open={isPopupOpen}
        onOpenChange={() => setIsPopupOpen(false)}
        header={{
          title: "Confirm Location",
          description: "Are you sure you want to confirm this location?",
        }}
        content={
          <div className="flex flex-row gap-2 justify-end">
            <MButton
              variant="destructive"
              onClick={() => {
                setIsPopupOpen(false);
              }}
            >
              Cancel
            </MButton>
            <MButton
              className="text-white"
              variant="primary"
              onClick={() => {
                console.log("Location", location);
                onConfirmLocation();
                setIsPopupOpen(false);
              }}
            >
              Confirm
            </MButton>
          </div>
        }
      />
    </Base>
  );
}
