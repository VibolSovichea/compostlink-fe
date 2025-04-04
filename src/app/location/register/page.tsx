"use client";

import Base from "@/components/shared/base-layout";
import { useRegisterLocationMutation } from "@/redux/slices/dataSlice";
import CompostLinkMap from "@/components/shared/map-layout";
import Cookies from "js-cookie";
import MDialog from "@/components/m-ui/m-dailog";
import MButton from "@/components/m-ui/m-button";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Flower } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      router.push("/home");
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
        <div className="text-2xl font-bold text-text_dark text-center">Location Registration</div>
        <div className="text-sm text-text_dark text-center">
          Please click on the map to select the location of your facility.
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

      <Flower className="size-6 text-primary/20 absolute top-28 right-10 rotate-45" />
      <Flower className="size-10 text-primary/20 absolute top-16 left-24" />
      <Flower className="size-16 text-primary/20 absolute bottom-10 right-10 rotate-45" />
      <Flower className="size-8 text-primary/20 absolute bottom-28 right-6 rotate-45" />

      <MDialog
        open={isPopupOpen}
        onOpenChange={() => setIsPopupOpen(false)}
        header={{
          title: "Confirm Location",
          description: "Are you sure you want to confirm this location?",
        }}
        content={
          <div className="flex flex-col gap-base">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${location?.longitude}!3d${location?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${location?.latitude}%2C${location?.longitude}!2s${location?.latitude}%2C${location?.longitude}!5e0!3m2!1sen!2s!4v1`}
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
              className="size-full rounded-lg"
            />
            <div className="flex flex-row gap-2 justify-end">
              <MButton
                full
                variant="primary"
                onClick={() => {
                  onConfirmLocation();
                  setIsPopupOpen(false);
                }}
              >
                Confirm
              </MButton>
            </div>
          </div>
        }
      />
    </Base>
  );
}
