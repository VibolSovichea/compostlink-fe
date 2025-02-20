"use client";

import Base from "@/components/shared/base-layout";
import FacilityForm from "@/components/auth/facility-form";

export default function FacilityFormPage() {
  return (
    <Base insideClassName="gap-base" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Compost Facility</div>
      </div>
      <FacilityForm />
    </Base>
  );
}
