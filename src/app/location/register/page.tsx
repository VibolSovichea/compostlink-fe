"use client";

import Base from "@/components/shared/base-layout";
import { useRegisterLocationMutation } from "@/redux/slices/dataSlice";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import CompostLinkMap from "@/components/shared/map-layout";
import Cookies from "js-cookie";

export default function LocationRegisterPage() {
  const facilityId = Cookies.get("user_id");
  const numericFacilityId = Number(facilityId);
  const [registerLocation, { isLoading, error }] =
    useRegisterLocationMutation();

  const handleConfirmLocation = async (
    lat: number,
    lng: number,
    address: string
  ) => {
    if (!facilityId) {
      alert("Error: Facility ID is missing.");
      return;
    }

    try {
      const response = await registerLocation({
        latitude: lat,
        longitude: lng,
        address,
        facilityId: numericFacilityId,
      });

      console.log("Mutation response:", response);

      alert(
        "Location registered successfully! : lat: " +
          lat +
          " lng: " +
          lng +
          " address: " +
          address
      );
    } catch (err) {
      console.error("Failed to register location:", err);

      if (err && typeof err === "object") {
        console.error("Detailed error:", JSON.stringify(err, null, 2));
      }

      alert("Failed to register location. Please try again.");
    }
  };
  return (
    <Base headerVariant="return-button" headerContent={{ pageTitle: "Location Register" }} hideNavigation>
      <div className="flex flex-col gap-4 mt-16">
        <div className="text-2xl font-bold text-black">Location Register</div>
        <div className="text-sm text-gray-500">Please fill in the following details to register your location</div>
        <CompostLinkMap onConfirm={handleConfirmLocation} />
      {isLoading && <p>Saving location...</p>}
      {error && <p>Error saving location.</p>}
      </div>
    </Base>
  )
}