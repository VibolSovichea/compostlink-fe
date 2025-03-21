import ProfilePreviewCard from "@/components/home/profile-preview-card";
import NewsCard from "@/components/home/news-card";
import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import QrModal from "../qr-modal";
import { useState } from "react";

interface UserHomePageProps {
  userData: User;
}

const UserHomePage = ({ userData }: UserHomePageProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-base">
      <ProfilePreviewCard points={userData.totalPoint} />
      <MButton
        variant="primary"
        full
        className="text-white"
        onClick={() => setOpen(true)}
      >
        Share your QR
      </MButton>
      <span className="flex items-center gap-2">
        <p className="text-black text-sm font-bold">News</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </span>
      <NewsCard data="https://www.youtube.com/embed/oFlsjRXbnSk?si=65HpkjACmfiVLduF" />
      <NewsCard data="https://www.youtube.com/embed/pi-vsJOaduk?si=im4Fy46vqGwaTQE3" />
      <QrModal
        open={open}
        onOpenChange={setOpen}
        id={userData.id.toString()}
        type="wastedonation"
      />
    </div>
  );
};

export default UserHomePage;
