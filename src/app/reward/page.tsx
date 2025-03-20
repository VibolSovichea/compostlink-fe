"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import Cookies from "js-cookie";
import CategorySlider from "@/components/shared/category-slider";
import { useProfileQuery, useRewardQuery } from "@/redux/slices/dataSlice";
import { useEffect, useMemo, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";
import { rewardData } from "@/utils/mockData";
import RewardModal from "@/components/reward/reward-modal";
import MDialog from "@/components/m-ui/m-dailog";

interface RewardContentProps {
  data: any;
  onRedeem: (id: number) => void;
}

const RewardContent = ({ data, onRedeem }: RewardContentProps) => {
  const router = useRouter();
  const { data: rewardData } = useRewardQuery();

  return (
    <div className="flex flex-col gap-base">
      {rewardData &&
        rewardData.map((item: any) => (
          <div
            key={item.id}
            className="rounded-lg p-base w-full h-24 flex gap-base shadow-lg border border-gray-100 items-center"
          >
            <div className="aspect-square size-16">
              <img
                src={item.imageUrl}
                alt="Example Image"
                className="size-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-md font-bold text-black">{item.title}</p>
              <p className="text-sm font-bold text-primary">
                {item.pointRequired} points
              </p>
            </div>

            <MButton
              variant="primary"
              className="text-sm w-20 text-white font-normal h-10"
              onClick={() => onRedeem(item.id)}
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
  const { data: rewardData } = useRewardQuery();
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (data) setPoints(data.totalPoint);
  }, [data]);

  // Step 1: Open RewardModal when clicking "Redeem"
  const handleRedeem = (id: number) => {
    setSelectedReward(id);
    setOpen(true);
  };

  // Step 2: Close RewardModal and Open Confirmation Dialog
  const handleSuccess = () => {
    setOpen(false);
    setConfirmDialogOpen(true);
  };

  return (
    <Base insideClassName="gap">
      <div className="flex flex-col gap-base sticky top-0 bg-white z-10 pt-base">
        <ProfilePreviewCard points={points} />
        {/* <CategorySlider
          categories={["All", "Food", "Entertainment", "Travel", "Other"]}
        /> */}
        <MButton
          variant="primary"
          full
          className="text-white mt-4"
          onClick={() => {
            router.push(`/redemption`);
          }}
        >
          Your Reward Ticket
        </MButton>
      </div>

      <RewardContent data={rewardData} onRedeem={handleRedeem} />

      {/* Step 1: Reward Modal */}
      <RewardModal
        rewardId={selectedReward ?? 0}
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess}
      />

      {/* Step 2: Confirmation Dialog */}
      <MDialog
        open={confirmDialogOpen}
        onOpenChange={({ open }) => setConfirmDialogOpen(open)}
        header={{ title: "Confirmation" }}
        content={
          <h1 className="text-xl text-black font-bold">
            Do you want to exchange{" "}
            <span className="text-primary">
              {rewardData?.find((r: any) => r.id === selectedReward)?.title}
            </span>{" "}
            for{" "}
            <span className="text-primary">
              {
                rewardData?.find((r: any) => r.id === selectedReward)
                  ?.pointRequired
              }{" "}
              points?
            </span>
          </h1>
        }
        footer={
          <div className="flex gap-2">
            <MButton
              variant="primary"
              full
              onClick={() => {
                if (selectedReward) {
                  const selectedRewardData = rewardData?.find(
                    (r: any) => r.id === selectedReward
                  );
                  if (
                    selectedRewardData &&
                    points < selectedRewardData.pointRequired
                  ) {
                    alert("Not enough points!");
                    return;
                  }
                  setConfirmDialogOpen(false);
                  router.push(`/reward/${selectedReward}`);
                }
              }}
            >
              Yes
            </MButton>
          </div>
        }
      />
    </Base>
  );
};

export default RewardPage;
