"use client";

import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import { Card } from "@chakra-ui/react"
import clsx from "clsx";
import RollingNumber from "@/animation/rolling-number";
import { Flower } from "lucide-react";
interface ProfilePreviewCardProps {
  points: number;
  sticky?: boolean;
  variant?: "user" | "facility";
}

const ProfilePreviewCard = ({ points, sticky = false, variant = "user" }: ProfilePreviewCardProps) => {

  return (
    <Card.Root className={clsx("w-full bg-primary shadow-xl h-32 relative overflow-hidden", { "sticky top-0": sticky })}>
      <Card.Body className="flex flex-col gap-6 py-base">
        <div className="absolute right-base top-base">
          <Flower className="text-white/20 size-4 rotate-4 translate-x-2" />
          <Flower className="text-white/20 size-6 rotate-4 -translate-x-6" />
          <Flower className="text-white/20 size-8 rotate-4 -translate-x-16" />
          <Flower className="text-white/20 size-12 rotate-4 -translate-x-18 -translate-y-6" />
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-sm text-white capitalize">Rewards points</div>
            <div className="text-secondary font-bold text-3xl">
              <RollingNumber value={points} />
            </div>
            {variant === "user" ? (
              <div className="text-sm text-white">use these points to redeem rewards</div>
            ) : (
              <div className="text-sm text-white">rewards points to our generators</div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card.Root>
  );
}

export default ProfilePreviewCard;