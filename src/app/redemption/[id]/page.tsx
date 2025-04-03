"use client";

import Base from "@/components/shared/base-layout";
import {
  useRedemptionInactivateMutation,
  useRewardByIdQuery,
  useRewardRedemptionByIdQuery,
} from "@/redux/slices/dataSlice";
import { CircleX, Gift, Loader2 } from "lucide-react";
import UserIcon from "@/../public/assets/icons/avatar-icon.svg";

import { useParams, useRouter } from "next/navigation";
import { rewardMockData, redemptionMockData } from "@/utils/mockData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Redemption } from "@/redux/slices/data.types";
import { Reward } from "@/redux/slices/data.types";
import Image from "next/image";
import MButton from "@/components/m-ui/m-button";
import toast from "react-hot-toast";
import Loading from "@/components/shared/loading";

export default function RedemptionsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [redemption, setRedemption] = useState<Redemption | null>(null);
  const [rewardId, setRewardId] = useState<number | null>(null);
  const [reward, setReward] = useState<Reward | null>(null);
  const redemptionId = Number(id as string);
  const [inactivateRedemption, { isLoading: isUpdating }] =
    useRedemptionInactivateMutation();

  // Fetch redemption data
  const { data: redemptionData, isLoading } = useRewardRedemptionByIdQuery(redemptionId);

  useEffect(() => {
    if (!redemptionData) return;
    setRedemption(redemptionData as Redemption);
    setRewardId(redemptionData?.rewardId ?? null);
  }, [redemptionData])

  // Fetch reward data only if rewardId is available
  const { data: rewardData } = useRewardByIdQuery(rewardId ?? 0, {
    skip: !rewardId, // Prevents calling API with undefined rewardId
  });

  useEffect(() => {
    if (!rewardData) return;
    setReward(rewardData);
  }, [rewardData])

  // using mock data as test
  // useEffect(() => {
  //   if (!redemptionMockData || !rewardMockData) return;
  //   const redemption = redemptionMockData.find((redemption) => redemption.id === redemptionId);
  //   const reward = rewardMockData.find((reward) => reward.id === redemption?.rewardId);
  //   setRedemption(redemption as Redemption);
  //   setReward(reward as Reward);
  // }, [redemptionId])

  const handleConfirmRedeem = useCallback(async () => {
    try {
      const result = await inactivateRedemption(redemptionId);
      toast.success("Redemption confirmed");
      router.push("/redemption");
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm redemption");
    }
  }, [inactivateRedemption, redemptionId, router])

  return useMemo(() => (
    <Base hideNavigation headerVariant="return-button" headerContent={{
      pageTitle: "Redemption"
    }}>
      {reward ? (
        <div className="flex flex-col gap-16 mt-[25vh]">
          <div className="text-2xl font-bold text-text_dark text-center">Confirm Redeem Reward</div>
          <div className="flex items-center">
            <div className="aspect-square mx-auto size-24  border-2 border-gray-100 rounded-lg shadow-lg p-base">
              <Image
                src={UserIcon}
                alt=""
                width={100}
                height={100}
                className="size-full object-cover"
              />
            </div>
            <Gift className="size-10 text-gray-300" />
            <div className="aspect-square mx-auto size-24 border-2 border-gray-100 rounded-lg shadow-lg p-base">
              <Image src={reward?.imageUrl} alt="" className="size-full rounded-lg object-cover" width={100} height={100} />
            </div>
          </div>

          <p className="text-text_dark text-center">Composter is looking to redeem <span className="font-bold capitalize">{reward?.title}</span></p>

          <div className="flex flex-col gap-4 absolute bottom-0 left-0 right-0 p-base">
            <p className="text-text_dark text-center text-sm">Before confirming please ensure that the reward is correct and the composter's reward ticket is valid.</p>
            <MButton
              variant="primary"
              full
              onClick={handleConfirmRedeem}
              disabled={redemption?.status === "Inactive"}
              loading={isUpdating}
            >
              {redemption?.status === "Active" ? "Confirm Redeem" : "Redeemed"}
            </MButton>
          </div>
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-2">
          <CircleX className="size-16 text-red-500" />
          <p className="text-text_dark text-sm">No redemptions found</p>
        </div>
      )}
    </Base>
  ), [redemption, reward, isUpdating, isLoading]);
}
