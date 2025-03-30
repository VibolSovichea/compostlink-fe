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
import { CircleX, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { redemptionMockData, rewardMockData } from "@/utils/mockData";
import { Redemption, RedemptionStatus } from "@/redux/slices/data.types";
import { Reward } from "@/redux/slices/data.types";
import Image from "next/image";

interface RewardContentProps {
  reward: any;
  status: RedemptionStatus;
  onRedeem: (id: number) => void;
}

const RewardContent = ({ reward, onRedeem, status }: RewardContentProps) => {
  return (
    <div className="rounded-lg p-base w-full h-24 flex gap-base shadow-lg border border-gray-100 items-center">
      <div className="aspect-square size-16">
        <Image
          src={reward.imageUrl}
          alt=""
          className="size-full rounded-lg object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-md font-bold text-text_dark">{reward.title}</p>
        <p className="text-sm font-bold text-primary">
          {reward.pointRequired} points
        </p>
      </div>

      <MButton
        variant="primary"
        className="text-sm w-20 text-white font-normal h-10"
        onClick={() => onRedeem(reward.redemptionId)}
      >
        Ticket
      </MButton>
    </div>
  );
};

export default function RedemptionsPage() {
  const [activeRedemption, setActiveRedemption] = useState<number | null>(null);
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId || "");
  const { data: rewardRedemption, isLoading } = useRewardRedemptionQuery();
  const { data: rewardData } = useRewardQuery();
  const [redemptionReward, setRedemptionReward] = useState<Reward[] | null>(
    null
  );

  useEffect(() => {
    if (!rewardRedemption || !rewardData) return;
    const rewards = rewardRedemption
      .map((redemption: Redemption) => {
        const reward = rewardData?.find(
          (reward: Reward) => reward.id === redemption.rewardId
        );
        return reward ? { ...reward, redemptionId: redemption.id } : null;
      })
      .filter(Boolean);
    setRedemptionReward(rewards as Reward[]);
  }, [rewardRedemption, rewardData]);

  // useEffect(() => {
  //   if (!redemptionMockData || !rewardMockData) return;
  //   const rewards = redemptionMockData.map((redemption) => {
  //     return rewardMockData?.find((reward) => reward.id === redemption.rewardId);
  //   })
  //   setRedemptionReward(rewards as Reward[]);
  // }, [rewardMockData, redemptionMockData])

  return useMemo(
    () => (
      <Base
        insideClassName="flex flex-col gap-base"
        hideNavigation
        headerVariant="return-button"
        headerContent={{
          pageTitle: "Redemptions",
        }}
      >
        <div className="mt-base sticky top-0 z-10">
          <ProfilePreviewCard points={userData?.totalPoint || 0} />
        </div>
        {redemptionReward && redemptionReward?.length > 0 ? (
          <div className="flex flex-col gap-base">
            {redemptionReward?.map((reward) => (
              <RewardContent
                key={reward.id}
                reward={reward}
                onRedeem={setActiveRedemption}
                status={
                  rewardRedemption?.find((redemption: Redemption) => {
                    return redemption.rewardId === reward.id;
                  })?.status as RedemptionStatus
                }
              />
            ))}
          </div>
        ) : isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
            <CircleX className="size-16 text-red-500" />
            <p className="text-text_dark text-sm">No redemptions found</p>
          </div>
        )}

        <QrModal
          open={activeRedemption !== null}
          onOpenChange={() => setActiveRedemption(null)}
          id={activeRedemption ? String(activeRedemption) : ""}
          type="redemption"
        />
      </Base>
    ),
    [redemptionReward, userData, activeRedemption, isLoading, rewardRedemption]
  );
}
