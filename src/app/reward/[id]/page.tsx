"use client";

import Base from "@/components/shared/base-layout";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { Stack } from "@chakra-ui/react";
import QRGenerator from "@/components/shared/qr-generator";
import { useQrShare } from "@/hooks/use-share-qr";
import {
  useRewardQuery,
  useRewardRedeemMutation,
} from "@/redux/slices/dataSlice";
import { RedemptionStatus } from "@/redux/slices/data.types";
import toast from "react-hot-toast";
import { RedemptionStatusEnum } from "@/redux/slices/data.enum";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface Redemption {
  rewardId: number;
  status: RedemptionStatus;
  pointSpent: number;
}

const mockData = [
  {
    id: 1,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
  {
    id: 2,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
  {
    id: 3,
    title: "templr",
    description: "eco-freindly templr made from recycle part of dying star.",
    imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
    pointRequired: 2000,
    stockQuantity: 58,
  },
];

const RewardPage = () => {
  const { id } = useParams();
  const rewardId = Number(id);
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const { shareQR } = useQrShare();
  const { data: rewards, isLoading, isError } = useRewardQuery();
  const [rewardRedeem] = useRewardRedeemMutation();
  const [reward, setReward] = useState<any>(null);

  // if (isLoading) return <p>Loading...</p>;
  // if (isError || !rewards) return <p>Failed to load rewards.</p>;

  // // Find the specific reward by ID
  // const reward = rewards.find((r: any) => r.id === rewardId);
  // if (!reward) return <p>Reward not found.</p>;

  const onConfirmRedemption = useCallback(async () => {
    try {
      const redemption: Redemption = {
        status: RedemptionStatusEnum.Active,
        rewardId: reward.id,
        pointSpent: reward.pointRequired,
      };

      const response = await rewardRedeem(redemption);
      console.log("Mutation response:", response);
      toast.success("Redeem Reward successfully!");
      setConfirm(true);
    } catch (err) {
      console.error("Redemption failed:", err);
      toast.error("Failed to redeem reward. Please try again.");
    }
  }, [reward, rewardRedeem]);

  useEffect(() => {
    if (!rewardId) return;
    const choosenReward = mockData.find((reward) => reward.id === rewardId);
    if (!choosenReward) return;
    setReward(choosenReward);
  }, [rewardId]);

  return useMemo(() => (
    <Base hideNavigation>
      {reward ? (
        <div>
        <h1 className="text-xl text-text_dark font-bold text-center">
          Redeem Successful
        </h1>
        {/* <QRGenerator data={String(reward.id)} /> */}
        <Image
          src="/assets/congrats.png"
          alt="Congratulations Logo"
          width={250}
          height={250}
          className="object-contain mt-6"
        />
        <p className="text-primary text-lg">Terms and Conditions</p>
        <p className="text-primary text-lg">
          1. You must collect the reward from CompostLink HQ on the map
        </p>
        <p className="text-primary text-lg">
          2. Show the QR-code ticket to CompostLink agent to claim your reward
        </p>
        <h1 className="text-xl text-text_dark font-bold text-center">
          Your QR ticket is Your Reward Ticket Page
        </h1>
        <MButton
          variant="primary"
          full
          className="text-white mt-4"
          onClick={() => {
            setTimeout(() => {
              router.push("/home");
            }, 3000);
          }}
        >
          Complete
        </MButton>
      </div>
      ) : (
        <div>
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
    </Base>
  ), [reward]);
};

export default RewardPage;
