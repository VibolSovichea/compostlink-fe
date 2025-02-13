"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";

export default function CongratulationsPage() {
  const router = useRouter();

  return (
    <Base insideClassName="items-center gap-half">
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Congratulations</div>
      </div>

      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/userhome")}
        >
          Home
        </MButton>
      </div>
    </Base>
  );
}