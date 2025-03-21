"use client";

import Base from "@/components/shared/base-layout";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

interface Redemption {
  rewardId: number;
  status: RedemptionStatus;
  pointSpent: number;
}

const RewardPage = () => {
  const { id } = useParams();
  const rewardId = Number(id);
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const { shareQR } = useQrShare();
  const { data: rewards, isLoading, isError } = useRewardQuery();
  const [rewardRedeem] = useRewardRedeemMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !rewards) return <p>Failed to load rewards.</p>;

  // Find the specific reward by ID
  const reward = rewards.find((r) => r.id === rewardId);
  if (!reward) return <p>Reward not found.</p>;

  console.log("Found reward:", reward);

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

  return (
    <Base
      insideClassName="py-base"
      headerVariant="return-button"
      headerContent={{ pageTitle: "Confirm Redemption" }}
      hideNavigation
    >
      {!confirm ? (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-6 text-center">
          <h1 className="text-xl text-black font-bold">
            Are you sure you want to exchange{" "}
            <span className="text-primary">{reward.title}</span> for{" "}
            <span className="text-primary">{reward.pointRequired} points</span>?
          </h1>
          <Stack gap={4} direction="row">
            <MButton
              variant="secondary"
              className="text-black"
              onClick={() => router.back()}
            >
              No
            </MButton>
            <MButton
              variant="primary"
              className="text-white"
              onClick={onConfirmRedemption}
            >
              Yes
            </MButton>
          </Stack>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <h1 className="text-xl text-black font-bold text-center">
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
          <h1 className="text-xl text-black font-bold text-center">
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
      )}
    </Base>
  );
};

export default RewardPage;
