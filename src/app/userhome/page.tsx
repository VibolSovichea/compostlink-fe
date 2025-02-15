"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";

export default function UserHomePage() {
  return (
    <Base insideClassName="items-center gap-half">
      
      <Image src={Logo} alt="Compostlink Logo" width={100} height={100} />

      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">CompostLink</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md ">
        <div className="text-center">Notification</div>
        <div className="text-center">Hello, John</div>
        <div className="text-center">Your Point: 0</div>
        <div className="text-center">5/10 Kg</div>
        <MButton
          variant="primary"
          full
          onClick={() => alert("Scan QR To Get Point")}
        >
          Scan QR To Get Point
        </MButton>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <div className="text-center">News</div>
        <MButton variant="secondary" full onClick={() => alert("Home")}>
          Home
        </MButton>
        <MButton variant="secondary" full onClick={() => alert("Rewards")}>
          Rewards
        </MButton>
        <MButton variant="secondary" full onClick={() => alert("Location")}>
          Location
        </MButton>
        <MButton variant="secondary" full onClick={() => alert("Profile")}>
          Profile
        </MButton>
      </div>
    </Base>
  );
}