import ProfilePreviewCard from "@/components/home/profile-preview-card";
import NewsCard from "@/components/home/news-card";
import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import QrModal from "../qr-modal";
import { useState } from "react";

interface UserHomePageProps {
  userData: User
}

const UserHomePage = ({ userData }: UserHomePageProps) => {
  const [open, setOpen] = useState(false);  
  return (
    <>
      <ProfilePreviewCard points={userData.totalPoint} />
      <MButton
        variant="primary"
        full
        className="text-white mt-4"
        onClick={() => setOpen(true)}
      >
        Redeem Reward
      </MButton>
      <NewsCard />
      <NewsCard />
      <QrModal open={open} onOpenChange={setOpen} userId={userData.id} />
    </>
  )
}

export default UserHomePage;
