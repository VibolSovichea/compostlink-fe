import Cookies from "js-cookie";
import toast from "react-hot-toast";

import MButton from "@/components/m-ui/m-button";
import Compost from "@/../public/assets/images/compost.png";
import Notification from "@/../public/assets/images/bell.png";
import { useAuth } from "@/provider/authProvider";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import ScanQRButton from "@/components/shared/scan-qr-button";
import NewsCard from "@/components/home/news-card";

const UserHomePage = () => {
  const { logout } = useAuth();
  const userId = Cookies.get('user_id');

  console.log(userId);

  return (
    <>
      <ProfilePreviewCard userId={userId || ""} />
      <ScanQRButton />
      <NewsCard />
      <MButton variant="secondary" full onClick={() => {
        toast.success("Logout successful");
        setTimeout(() => {
          logout();
        }, 2500);
      }}>
        Logout
      </MButton>
    </>
  )
}

export default UserHomePage;
