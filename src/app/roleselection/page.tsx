"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import userLogo from "@/../public/assets/user.png";
import facilityLogo from "@/../public/assets/facility.png";
import { useRouter } from "next/navigation";

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <Base insideClassName="items-center gap-half" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">What is your role?</div>
        <div className="text-center text-body text-gray-600 lowercase">You are both our hero!</div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex gap-3">
          <div
            className="w-1/2 flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => router.push("/congratulations")}
          >
            <Image
              src={userLogo}
              alt="User Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            {/* <MButton variant="secondary" full>
              Generator
            </MButton> */}
            <div className="text-center text-body text-black">
            Generator
              </div>
          </div>
          <div
            className="w-1/2 flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => router.push("/facilityform")}
          >
            <Image
              src={facilityLogo}
              alt="Facility Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            {/* <MButton variant="primary" full>
              Facility
            </MButton> */}
            <div className="text-center text-body text-black">
              Facility
              </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
