"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
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
