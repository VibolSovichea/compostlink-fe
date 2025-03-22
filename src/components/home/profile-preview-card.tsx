"use client";

import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import { Card } from "@chakra-ui/react"
import clsx from "clsx";

interface ProfilePreviewCardProps {
  points: number;
  sticky?: boolean;
  variant?: "user" | "facility";
}

const ProfilePreviewCard = ({ points, sticky = false, variant = "user" }: ProfilePreviewCardProps) => {

  return (
    <Card.Root className={clsx("w-full bg-primary shadow-xl h-32", { "sticky top-0": sticky })}>
      <Card.Body className="flex flex-col gap-6 py-base">
        <div className="flex">
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-sm text-white capitalize">Main balance</div>
            <div className="text-secondary font-bold text-3xl">{`${points} pts`}</div>
            {variant === "user" ? (
              <div className="text-sm text-white">use these points to redeem rewards</div>
            ) : (
              <div className="text-sm text-white">rewards points to our generators</div>
            )}
          </div>
          <Image
            src={Logo}
            alt=""
            width={100}
            height={100}
            className="size-20"
          />
        </div>
      </Card.Body>
    </Card.Root>
  );
}

export default ProfilePreviewCard;