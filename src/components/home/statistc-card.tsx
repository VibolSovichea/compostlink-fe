"use client"

import { Card } from "@chakra-ui/react"
import RollingNumber from "@/animation/rolling-number"
import { Circle } from "lucide-react";
import { getDailyCompostQuote } from "@/utils/random-quotes";
import { useGetWasteDonationByFacilityIdQuery, useGetWasteDonationByUserIdQuery } from "@/redux/slices/dataSlice";
import { useEffect, useMemo, useState } from "react";
import { WasteDonation } from "@/redux/slices/data.types";
import { useRouter } from "next/navigation";

interface StatisticCardProps {
  userId: string;
  role: "user" | "facility";
}

const StatisticCard = ({ userId, role }: StatisticCardProps) => {
  const router = useRouter();
  const { data: wasteDonation } = useGetWasteDonationByUserIdQuery(userId ?? "");
  const { data : wasteRecieved } = useGetWasteDonationByFacilityIdQuery(userId ?? "");
  const [totalWasteDonation, setTotalWasteDonation] = useState(0);

  useEffect(() => {
    console.log(wasteDonation);
    console.log(userId);
    if (!wasteDonation) return;

    if (role === "user") {
      setTotalWasteDonation(wasteDonation.donationCount ?? 0);
    } else {
      setTotalWasteDonation(wasteRecieved?.donationCount ?? 0);
    }
  }, [wasteDonation, wasteRecieved]);

  return useMemo(() => (
    <Card.Root className="bg-primary  shadow-lg w-full h-32" onClick={() => router.push("/statistic")}>
      <Card.Body className="flex flex-row items-center size-full">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-md font-semibold text-text_light tracking-tight">{getDailyCompostQuote()}</p>
          <p className="text-xs text-text_light tracking-tight">last compost: 2025-03-22 - 20g</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center size-24 relative">
          <Circle className="text-text_light absolute opacity-15 size-28" />
          <span className="text-4xl font-bold text-text_light">
            <RollingNumber value={totalWasteDonation} />
          </span>
        </div>
      </Card.Body>
    </Card.Root>
  ), [totalWasteDonation])
}

export default StatisticCard;