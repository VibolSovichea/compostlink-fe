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
      <div className="flex justify-center">
        <MButton
          variant="primary"
          className="flex items-center w-48 justify-center py-2 rounded-xl bg-primary text-white shadow-lg mt-2"
          onClick={() => setOpen(true)}
        >
          <span className="text-lg font-medium"> Get QR Code</span>
          <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <FaArrowRight className="text-green-500 w-4 h-4" />
          </span>
        </MButton>
      </div>

      <NewsCard />
      <QrModal open={open} onOpenChange={setOpen} userId={userData.id.toString()} />
    </>
  )
}

export default UserHomePage;
