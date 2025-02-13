"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";

export default function FacilityHomePage() {
  return (
    <Base insideClassName="items-center gap-half">
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Good Morning</div>
        <div className="text-center text-gray-600">Hero</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <div className="text-center text-black">Announcement / Countdown till Delivery?</div>
        <div className="text-center text-red-500">Look out! We will see you in 1 day</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <div className="text-center text-black" >Collected Waste: 3500</div>
        <div className="text-center text-black">Resource Need: [Details]</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <div className="text-center text-black">Completed Orders: 10</div>
        <div className="text-center text-black">Pending Orders: [Number]</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => alert("View Orders")}
        >
          View Orders
        </MButton>
      </div>
    </Base>
  );
}