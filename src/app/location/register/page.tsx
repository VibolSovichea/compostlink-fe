"use client";

import Base from "@/components/shared/base-layout";

export default function LocationRegisterPage() {
  return (
    <Base headerVariant="return-button" headerContent={{ pageTitle: "Location Register" }} hideNavigation>
      <div className="flex flex-col gap-4 mt-16">
        <div className="text-2xl font-bold text-black">Location Register</div>
        <div className="text-sm text-gray-500">Please fill in the following details to register your location</div>
      </div>
    </Base>
  )
}