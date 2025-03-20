"use client";

import Base from "@/components/shared/base-layout";
import {
  useRedemptionInactivateMutation,
  useRewardByIdQuery,
  useRewardRedemptionByIdQuery,
} from "@/redux/slices/dataSlice";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function RedemptionsPage() {
  const { id } = useParams();
  const redemptionId = Number(id as string);
  const [inactivateRedemption, { isLoading: isUpdating }] =
    useRedemptionInactivateMutation();

  // Fetch redemption data
  const { data, isLoading } = useRewardRedemptionByIdQuery(redemptionId);
  const redemption = data ?? null;
  const rewardId = redemption?.rewardId ?? 0;

  // Fetch reward data only if rewardId is available
  const { data: rewardData } = useRewardByIdQuery(rewardId, {
    skip: !rewardId, // Prevents calling API with undefined rewardId
  });

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!redemption) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-primary text-sm">No redemption found</p>
      </div>
    );
  }

  const handleConfirmRedeem = async () => {
    await inactivateRedemption(redemptionId);
  };

  return (
    <Base insideClassName="flex flex-col gap-base" headerVariant="default">
      <div className="flex flex-col gap-base">
        <p className="text-primary text-lg">Confirm Redeem Reward</p>
        <div className="flex flex-col gap-base">
          <div className="aspect-square size-16">
            {rewardData?.imageUrl && (
              <img
                src={rewardData.imageUrl}
                alt={rewardData.title || "Reward Image"}
                className="size-full rounded-lg"
              />
            )}
          </div>
          {rewardData && (
            <p className="text-primary text-md">Reward: {rewardData.title}</p>
          )}
          <p className="text-primary text-md">
            Point Spent: {redemption.pointSpent}
          </p>
        </div>
      </div>
      <button
        onClick={handleConfirmRedeem}
        disabled={isUpdating || data?.status === "Inactive"}
      >
        {isUpdating
          ? "Updating..."
          : data?.status === "Inactive"
          ? "Already Redeemed"
          : "Confirm Redeem"}
      </button>
    </Base>
  );
}
