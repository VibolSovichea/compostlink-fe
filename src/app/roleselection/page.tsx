"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <Base insideClassName="items-center gap-half" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">What is your role?</div>
        <div className="text-center text-gray-600">You are both our hero!</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/facilityform")}
          
        >
          Facility
        </MButton>
        <MButton
          variant="secondary"
          full
          onClick={() => router.push("/congratulations")}
        >
          Generator
        </MButton>
      </div>
    </Base>
  );
}
