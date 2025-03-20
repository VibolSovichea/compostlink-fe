"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import QrModal from "@/components/home/qr-modal";
import MButton from "@/components/m-ui/m-button";
import Base from "@/components/shared/base-layout";
import {
  useProfileQuery,
  useRewardQuery,
  useRewardRedemptionQuery,
} from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface RewardContentProps {
  reward: any;
  onRedeem: (id: number) => void;
}

const RewardContent = ({ reward, onRedeem }: RewardContentProps) => {
  return (
    <div className="rounded-lg p-base w-full h-24 flex gap-base shadow-lg border border-primary bg-primary">
      <div className="aspect-square size-16">
        <img
          src={reward.imageUrl}
          alt="Example Image"
          className="size-full rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-md font-bold text-white">{reward.title}</p>
        <p className="text-sm font-bold text-white">
          {reward.pointRequired} points
        </p>
      </div>
    </div>
  );
};

export default function RedemptionsPage() {
  const [activeRedemption, setActiveRedemption] = useState<number | null>(null);
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId || "");
  const { data: rewardRedemption, isLoading } = useRewardRedemptionQuery();
  const { data: rewardData } = useRewardQuery();

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!rewardRedemption || rewardRedemption.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-primary text-sm">No redemptions found</p>
      </div>
    );
  }

  return (
    <Base
      insideClassName="flex flex-col gap-base"
      headerVariant="default"
      headerContent={{ username: userData?.name }}
    >
      <div className="sticky top-0 z-10">
        <ProfilePreviewCard points={userData?.totalPoint || 0} />
      </div>

      <ul className="flex flex-col gap-base">
        {rewardRedemption.map((redemption) => {
          const reward = rewardData?.find((r) => r.id === redemption.rewardId);
          if (!reward) return null;

          return (
            <li key={redemption.id} className="list-none">
              <RewardContent
                reward={reward}
                onRedeem={(id) => console.log("Redeem:", id)}
              />
              <MButton
                variant="secondary"
                className="text-sm w-20 text-primary font-normal h-10"
                onClick={() =>
                  redemption.id !== undefined &&
                  setActiveRedemption(redemption.id)
                }
              >
                Ticket
              </MButton>

              <QrModal
                open={activeRedemption === redemption.id} // Direct number comparison
                onOpenChange={() => setActiveRedemption(null)}
                id={redemption.id ? String(redemption.id) : ""}
                type="redemption"
              />
            </li>
          );
        })}
      </ul>
    </Base>
  );
}
