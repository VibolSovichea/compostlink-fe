"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
<<<<<<< HEAD
import MBottomNavigation from "@/components/m-ui/m-bottom-navigation";
import Image from "next/image";
import Compost from "@/../public/assets/images/compost.png";
import Logo from "@/../public/assets/compostlink.png";
import Notification from "@/../public/assets/images/bell.png";
import { useAuth } from "@/provider/authProvider";
import { useState, useEffect } from "react";

export function MainRewardPage() {
  const [showBackground, setShowBackground] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const Rewards = [
    {
      id: 1,
      title: "10% Discount on Compost",
      description: "Description0",
      image: Compost,
      date: "2021-09-01",
    },
    {
      id: 2,
      title: "20% Discount on Compost",
      description: "Description1",
      image: Compost,
      date: "2021-09-02",
    },
    {
      id: 3,
      title: "15% Discount on Compost",
      description: "Description2",
      image: Compost,
      date: "2021-09-03",
    },
  ];

  return (
    <Base insideClassName="items-center min-h-screen overflow-y-auto" hideNavigation={false}>
      {/* Sticky Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${showBackground ? "bg-white shadow-md" : "bg-white"}`}
      >
        <div className="flex justify-between items-center px-4 py-2 w-80 mx-auto">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <Image src={Notification} alt="Notification" width={30} height={25} />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center p-4 gap-4 w-full pt-20">
        {/* User Info Card */}
        <div className="bg-white text-black p-4 rounded-2xl shadow-md w-80 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Hello, John</p>
              <p className="font-bold">Your Point: 0</p>
            </div>
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                src="https://w0.peakpx.com/wallpaper/109/769/HD-wallpaper-anime-profile-monkey-d-luffy-luffy-portrait-thumbnail.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative mt-2">
            <div className="w-full bg-gray-300 h-2 rounded-full"></div>
            <div
              className="absolute top-0 left-0 bg-green-500 h-2 rounded-full"
              style={{ width: "50%" }}
            ></div>
            <p className="text-xs text-center mt-1">5/10 Kg</p>
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-2 w-full justify-center">
          <button className="bg-green-500 text-white font-bold px-4 py-2 rounded-full">ALL</button>
          <button className="bg-green-500 text-white font-bold px-4 py-2 rounded-full">NEWEST</button>
          <button className="bg-green-500 text-white font-bold px-4 py-2 rounded-full">OLDEST</button>
        </div>

        {/* Rewards List */}
        <div className="w-80 max-w-md space-y-4">
          {Rewards.map((rewards, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
              {/* Image */}
              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                <Image
                  src={rewards.image}
                  alt="Reward Image"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>

              {/* Content (Title, Description, Date) */}
              <div className="flex-1">
                <p className="text-lg text-black font-semibold">{rewards.title}</p>
                <p className="text-sm text-gray-600">{rewards.description}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {rewards.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <MBottomNavigation />
    </Base>
  );
};

export default MainRewardPage;
=======
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
        <div key={item.id} className="rounded-lg p-base w-full h-24 flex gap-base shadow-lg border border-gray-100 items-center">
          <div className="aspect-square size-16">
            <div className="bg-primary size-full rounded-lg"></div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-md font-bold text-black">{item.name}</p>
            <p className="text-sm font-bold text-primary">{item.points} points</p>
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
      <div className="flex flex-col gap-base sticky top-0 bg-white z-10 pt-base">
        <ProfilePreviewCard points={points} />
        <CategorySlider categories={["All", "Food", "Entertainment", "Travel", "Other"]} />
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
>>>>>>> b2d8332293f54de6660db2830715b133ba9d42be
