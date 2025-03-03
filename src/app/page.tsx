"use client";

import Base from "@/components/shared/base-layout";
import Image from "next/image";
import logo from "@/../public/assets/compostlink.png";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <Base insideClassName="items-center gap-half" font-lato hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">
          Welcome to <span className="font-bold text-primary">compy</span>
        </div>
        <p className="text-body text-black">Connecting Compost to the Future</p>
      </div>

      <div className="flex-1 flex items-center">
        <Image
          src={logo}
          alt="CompostLink Logo"
          width={200}
          height={200}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col gap-medium w-full">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/auth/signup")}
        >join compy</MButton>
        <MButton
          variant="secondary"
          full
          onClick={() => router.push("/auth/signin")}
        >already a comper</MButton>
      </div>
    </Base>
  )
}