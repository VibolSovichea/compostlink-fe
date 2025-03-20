import ProfilePreviewCard from "@/components/home/profile-preview-card";
import NewsCard from "@/components/home/news-card";
import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import QrModal from "../qr-modal";
import { FaArrowRight } from "react-icons/fa";
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
        className="flex items-center w-48 justify-center py-2 rounded-xl bg-primary text-white shadow-lg mt-4"
        onClick={() => setOpen(true)}
      >
        <span className="text-lg font-medium">Get QR Code </span>
        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          < FaArrowRight className="text-green-500 w-5 h-5" />
        </span>
        
      </MButton>
      <NewsCard />
      <NewsCard />
      <QrModal open={open} onOpenChange={setOpen} userId={userData.id} />
    </>
  )
}

export default UserHomePage;
