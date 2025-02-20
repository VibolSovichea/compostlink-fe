"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import FacilityForm from "@/components/auth/facility-form";
import router from "next/router";

export default function FacilityFormPage() {
  return (
    <Base insideClassName="gap-base" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Compost Facility</div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Name?"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Address?"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Contact Info"
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex-grow"></div>
 
      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/congratulations")}
        >
          Confirm
        </MButton>
      </div>
      <FacilityForm />
    </Base>
  );
}
