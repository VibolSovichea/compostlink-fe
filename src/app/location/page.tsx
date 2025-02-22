"use client";

import Base from "@/components/shared/base-layout";

export default function LocationPage() {
  return (
    <Base insideClassName="items-center gap-half" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Location</div>
      </div>
    </Base>
  );
}