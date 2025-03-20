"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import Cookies from "js-cookie";
import CategorySlider from "@/components/shared/category-slider";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import { useEffect, useMemo, useState } from "react";
import MButton from "@/components/m-ui/m-button";
import { useRouter } from "next/navigation";
import { rewardData } from "@/utils/mockData";
import RewardModal from "@/components/reward/reward-modal";

interface RewardContentProps {
  data: any;
  onRedeem: (id: number) => void;
}

const RewardContent = ({ data, onRedeem }: RewardContentProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-base">
      {data.map((item: any) => (
        <div key={item.id} className="rounded-xl p-base w-94 h-24 flex gap-base shadow-lg border border-green-400 items-center">
          <div className="aspect-square size-16">
            <div className="bg-primary size-full rounded-xl"></div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-md font-bold text-black">{item.name}</p>
            <p className="text-sm font-bold text-yellow-400">{item.points} points</p>
          </div>

          <MButton
            variant="primary"
            className="text-sm w-20 text-white font-normal h-10 rounded-xl"
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
  const userId = Cookies.get('user_id');
  const { data } = useProfileQuery(userId || "");
  const [points, setPoints] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<number>(0);

  useEffect(() => {
    data && setPoints(data.totalPoint);
  }, [data]);

  const handleRedeem = (id: number) => {
    console.log(id);
    setOpen(true);
    setSelectedReward(id);
  }

  const handleSuccess = () => {
    router.push(`/reward/${selectedReward}`);
    setOpen(false);
  }

  return (
    <Base insideClassName="gap">
      <div className="flex flex-col w-full gap-base top-0 z-10 pt-base ">
        <ProfilePreviewCard points={points} />
        <CategorySlider categories={["All", "Voucher", "Gift Card", "Drink"]} />
      </div>
      <RewardContent data={rewardData} onRedeem={handleRedeem} />
      <RewardModal
        rewardId={selectedReward}
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess} />
    </Base>
  )
}

export default RewardPage;