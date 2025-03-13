"use client";

import { useRegisterLocationMutation } from "@/redux/slices/dataSlice";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import CompostLinkMap from "@/components/shared/map-layout";
import Cookies from "js-cookie";

const RegisterLocationPage = () => {
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
    <Base insideClassName="flex flex-col gap-base">
      <ProfilePreviewCard userId={facilityId || ""} />
      <div className="text-center">Assigned Drop-off Point</div>
      <CompostLinkMap onConfirm={handleConfirmLocation} />
      {isLoading && <p>Saving location...</p>}
      {error && <p>Error saving location.</p>}
    </Base>
  );
};

export default RegisterLocationPage;
