"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import Cookies from "js-cookie";
import CategorySlider from "@/components/shared/category-slider";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import { useEffect, useState } from "react";

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
  {
    id: 5,
    name: "Reward 5",
    description: "Reward 5 description",
  },
  {
    id: 6,
    name: "Reward 6",
    description: "Reward 6 description",
  },
  {
    id: 7,
    name: "Reward 7",
    description: "Reward 7 description",
  },
  {
    id: 8,
    name: "Reward 8",
    description: "Reward 8 description",
  },
  {
    id: 9,
    name: "Reward 9",
    description: "Reward 9 description",
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
  const { data } = useProfileQuery(userId || "");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    data && setPoints(data.totalPoint);
  }, [data]);

  return (
    <Base insideClassName="gap-0">
      <div className="flex flex-col gap-base sticky top-base bg-secondary z-10 pb-base">
        <ProfilePreviewCard points={points} />
        <CategorySlider categories={["All", "Food", "Entertainment", "Travel", "Other"]} />
      </div>
      <RewardContent data={mockData} />
    </Base>
  )
}

export default RewardPage;
