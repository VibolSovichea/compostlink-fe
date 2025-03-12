"use client";

import Base from "@/components/shared/base-layout";
import Header from "@/components/shared/header";

export default function LocationPage() {
  return (
    <Base insideClassName="items-center gap-base">
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">QR Code</div>
      </div>
    </Base>
  );
}