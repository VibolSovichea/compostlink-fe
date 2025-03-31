"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import Cookies from "js-cookie";
import CategorySlider from "@/components/shared/category-slider";
import { useProfileQuery, useRewardQuery, useRewardRedeemMutation } from "@/redux/slices/dataSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";
import { rewardData } from "@/utils/mockData";
import RewardModal from "@/components/reward/reward-modal";
import MDialog from "@/components/m-ui/m-dailog";
import Image from "next/image";
import { Redemption, Reward } from "@/redux/slices/data.types";
import SuccessDialog from "@/components/shared/success-dialog";
import FailedDialog from "@/components/shared/failed-dialog";
import { RedemptionStatusEnum } from "@/redux/slices/data.enum";
import { toast } from "react-hot-toast";

interface RewardContentProps {
  data: Reward[];
  onRedeem: (reward: Reward) => void;
}

// const mockData = [
//   {
//     id: 1,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2,
//     stockQuantity: 58,
//   },
//   {
//     id: 2,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },
//   {
//     id: 3,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },
//   {
//     id: 4,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },
//   {
//     id: 5,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },
//   {
//     id: 6,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },
//   {
//     id: 7,
//     title: "templr",
//     description: "eco-freindly templr made from recycle part of dying star.",
//     imageUrl: "https://i.ibb.co/q3pLrvFs/51u-BSV9-Ugb-L.jpg",
//     pointRequired: 2000,
//     stockQuantity: 58,
//   },

// ] as Reward[];

const RewardContent = ({ data, onRedeem }: RewardContentProps) => {

  return (
    <div className="flex flex-col gap-base">
      {data &&
        data.map((item: Reward) => (
          <div
            key={item.id}
            className="rounded-lg p-base w-full h-24 flex gap-base shadow-lg border border-gray-100 items-center"
          >
            <div className="aspect-square size-16">
              <Image
                src={item.imageUrl}
                alt="Example Image"
                className="size-full rounded-lg object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-md font-bold text-text_dark">{item.title}</p>
              <p className="text-sm font-bold text-primary">
                {item.pointRequired} points
              </p>
            </div>

            <MButton
              variant="primary"
              className="text-sm w-20 text-white font-normal h-10"
              onClick={() => onRedeem(item)}
            >
              Redeem
            </MButton>
          </div>
        ))}
    </div>
  );
};

const RewardPage = () => {
  const userId = Cookies.get("user_id");
  const { data } = useProfileQuery(userId || "");
  const [points, setPoints] = useState(0);
  const [open, setOpen] = useState(false);
  const { data: rewards } = useRewardQuery();
  const [redeemReward, { isLoading }] = useRewardRedeemMutation();
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [failedDialogOpen, setFailedDialogOpen] = useState(false);
  const [rewardData, setRewardData] = useState<Reward[]>([]);

  useEffect(() => {
    if (!rewards) return;
    const sortedData = [...rewards].sort((a,b) => a.id - b.id);
    setRewardData(sortedData);
  }, [rewards])

  useEffect(() => {
    if (data) setPoints(data.totalPoint);
  }, [data]);

  const handleRedeem = (reward: Reward) => {
    console.log("reward", reward);
    setSelectedReward(reward);
    setOpen(true);
  };

  const handleSuccess = () => {
    setOpen(false);
    setConfirmDialogOpen(true);
  };

  const onConfirmRedemption = useCallback(async () => {
    if (!selectedReward) return;
    const selectedRewardData = rewardData?.find((reward: Reward) => reward.id === selectedReward.id);

    if (selectedRewardData && points < selectedRewardData.pointRequired) {
      setFailedDialogOpen(true);
      setConfirmDialogOpen(false);
      return;
    } else {
      try {
        const redemption: Redemption = {
          status: RedemptionStatusEnum.Active,
          rewardId: selectedReward?.id ?? 0,
          pointSpent: selectedReward?.pointRequired ?? 0,
        };

        const response = await redeemReward(redemption);
        console.log("Mutation response:", response);
        toast.success("Redeem Reward successfully!");
        setSuccessDialogOpen(true);
      } catch (err) {
        console.error("Redemption failed:", err);
        toast.error("Failed to redeem reward. Please try again.");
      } finally {
        setConfirmDialogOpen(false);
      }
    }
  }, [selectedReward]);

  return (
    <Base>
      <div className="flex flex-col gap-base sticky top-0 bg-white z-10 pt-base shadow-white shadow-xl">
        <ProfilePreviewCard points={points} />
        <MButton
          variant="primary"
          full
          className="text-white"
          onClick={() => {
            router.push(`/redemption`);
          }}
        >
          Your Reward Ticket
        </MButton>
      </div>

      <RewardContent data={rewardData || []} onRedeem={handleRedeem} />

      <RewardModal
        data={rewardData || []}
        rewardId={selectedReward?.id ?? 0}
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess}
      />

      <MDialog
        open={confirmDialogOpen}
        onOpenChange={({ open }) => setConfirmDialogOpen(open)}
        header={{
          title: "Redeem Reward",
          description: "Are you sure you want to exchange for this reward"
        }}
        content={
          <div className="flex flex-col gap-base">
            <span className={`text-2xl font-bold text-center ${points < (selectedReward?.pointRequired || 0) ? "text-red-500" : "text-green-500"}`}>
              {`${selectedReward?.pointRequired} points`}
            </span>
            <div className="flex w-full justify-end">
              <MButton
                variant="primary"
                className="w-fit p-base"
                loading={isLoading}
                full
                onClick={onConfirmRedemption}
              >
                Confirm
              </MButton>
            </div>
          </div>
        }
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={(open) => {
          setSuccessDialogOpen(open);
          router.push("/redemption");
        }}
        description="Your reward has been redeemed successfully"
      />

      <FailedDialog
        open={failedDialogOpen}
        onOpenChange={(open) => setFailedDialogOpen(open)}
        description="You have insufficient points"
      />
    </Base>
  );
};

export default RewardPage;
