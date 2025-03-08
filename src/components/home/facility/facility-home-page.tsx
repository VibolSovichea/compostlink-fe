import Cookies from "js-cookie";
import toast from "react-hot-toast";

import MButton from "@/components/m-ui/m-button";
import { useAuth } from "@/provider/authProvider";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import ScanQRButton from "@/components/shared/scan-qr-button";
import NewsCard from "@/components/home/news-card";

const FacilityHomePage = () => {
  const { logout } = useAuth();
  const userId = Cookies.get('user_id');

  return (
    <>
      <ProfilePreviewCard userId={userId || ""} />
      <ScanQRButton />
      <NewsCard />
      <div className="flex absolute bottom-base right-0 left-0 px-base">
        <MButton
          variant="secondary"
          full
          onClick={() => {
            toast.success("Logout successful");
            setTimeout(() => {
              logout();
            }, 2500);
          }}>
          Logout
        </MButton>
      </div >
    </>
  )
}

export default FacilityHomePage;
