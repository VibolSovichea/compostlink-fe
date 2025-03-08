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

export default function RewardPage() {
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
      title: "How to Compost at Home",
      description: "Description0",
      image: Compost,
      date: "2021-09-01",
    },
    {
      id: 2,
      title: "Benefits of Composting",
      description: "Description1",
      image: Compost,
      date: "2021-09-02",
    },
    {
      id: 3,
      title: "Community Composting Guide",
      description: "Description2",
      image: Compost,
      date: "2021-09-03",
    },
  ];

  return (
    <Base insideClassName="items-center min-h-screen overflow-y-auto" hideNavigation={false}>
        {/* Sticky Header */}
        <div
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            showBackground ? "bg-white shadow-md" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-2 w-80 mx-auto">
            <Image src={Logo} alt="Logo" width={70} height={70} />
            <Image src={Notification} alt="Notification" width={30} height={25} />
          </div>
        </div>


        {/* Content Wrapper */}
        <div className="flex flex-col items-center p-4 gap-4 w-full pt-20"> {/* Prevent overlap */}
          
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
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
}
=======
import Cookies from "js-cookie";
import CategorySlider from "@/components/shared/category-slider";

interface RewardContentProps {
  data: any
}

const mockData = [
  {
    id: 1,
    name: "Reward 1",
    description: "Reward 1 description",
  },
  {
    id: 2,
    name: "Reward 2",
    description: "Reward 2 description",
  },
  {
    id: 3,
    name: "Reward 3",
    description: "Reward 3 description",
  },
  {
    id: 4,
    name: "Reward 4",
    description: "Reward 4 description",
  },

]

const RewardContent = ({ data }: RewardContentProps) => {
  return (
    <div className="flex flex-col gap-base">
      {data.map((item: any) => (
        <div key={item.id} className="bg-primary rounded-lg p-4 flex flex-col gap-2">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

const RewardPage = () => {
  const userId = Cookies.get('user_id');

  return (
    <Base insideClassName="flex flex-col gap-base">
      <ProfilePreviewCard userId={userId || ""} />
      <CategorySlider categories={["All", "Food", "Entertainment", "Travel", "Other"]} />
      <RewardContent data={mockData} />
    </Base>
  )
}

export default RewardPage;
>>>>>>> origin/feat/authToHome
