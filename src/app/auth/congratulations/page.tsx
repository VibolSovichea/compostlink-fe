"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import congratsLogo from "@/../public/assets/congrats.png";
import { useRouter } from "next/navigation";

export default function CongratulationsPage() {
  const router = useRouter();

  return (
    <Base insideClassName="items-center gap-base" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">Congratulations</div>
      </div>

      <Image
        src={congratsLogo}
        alt="Congratulations Logo"
        width={250}
        height={250}
        className="object-contain"
        priority
      />

      <div className="flex-grow"></div>
      <div className="w-full"></div>

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