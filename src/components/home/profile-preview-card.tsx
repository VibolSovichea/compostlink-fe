"use client";

import Image from "next/image";
import Logo from "@/../public/assets/compostlink.png";
import { Card } from "@chakra-ui/react"

import clsx from "clsx";
import { CircularProgress } from '@chakra-ui/progress';

interface ProfilePreviewCardProps {
  points: number;
  sticky?: boolean;
  variant?: "user" | "facility";
}

const ProfilePreviewCard = ({ points, sticky = false, variant = "user" }: ProfilePreviewCardProps) => {

  return (
    <Card.Root className={clsx("w-full rounded-xl bg-primary shadow-xl h-32", { "sticky top-0": sticky })}>
      <Card.Body className="flex flex-col rounded-xl gap-6 py-base">
        <div className="flex">
          <div className="flex flex-1 flex-col gap-2 ">
            <div className="text-sm text-black capitalize">Main balance</div>
            <div className="text-secondary font-bold text-2xl">{`${points} pts`}</div>
            {variant === "user" ? (
              <div className="text-xs text-black ">USE THESE POINTS TO GET REWARDS</div>
            ) : (
              <div className="text-xs text-black">rewards points to our generators</div>
            )}
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <CircularProgress size="100px" thickness="6px" value={points} color="green.400" trackColor="white" />
            
            {/* Image in Center */}
            <Image
              src={Logo}
              alt="Logo"
              width={100}  // Adjust size
              height={100} // Adjust size
              className="absolute" // Centered inside circle
            />
          </div>
        </div>
      </Card.Body>
    </Card.Root>
  );
}

export default ProfilePreviewCard;