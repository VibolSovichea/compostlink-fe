"use client";

import Base from "@/components/shared/base-layout";
import Image from "next/image";
import logo from "@/../public/assets/compostlink.png";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Base hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center mt-16">
        <div className="text-center leading-12">
          Welcome to <br></br><span className="font-bold text-primary">CompostLink</span>
        </div>
        <p className="text-body text-black mt-8">Connecting Compost to the Future</p>
      </div>

      <div className="flex items-center justify-center mt-20">
        <Image
          src={logo}
          alt="CompostLink Logo"
          width={200}
          height={200}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col gap-base w-full absolute bottom-8 right-0 left-0 px-base">
        <MButton
          variant="primary"
          full
          onClick={() => router.push("/auth/signup")}
        >
          Become a comper
        </MButton>
        <MButton
          variant="secondary"
          full
          onClick={() => router.push("/auth/signin")}
        >
          Already a comper
        </MButton>
      </div>
    </Base>
  );
}
