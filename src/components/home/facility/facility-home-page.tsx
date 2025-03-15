import { User } from "@/redux/slices/data.types";
import MButton from "@/components/m-ui/m-button";
import NewsCard from "@/components/home/news-card";
import ScanQRButton from "@/components/shared/scan-qr-button";
import ProfilePreviewCard from "@/components/home/profile-preview-card";

interface FacilityHomePageProps {
  userData: User
}

const FacilityHomePage = ({ userData }: FacilityHomePageProps) => {
  return (
    <>
      <ProfilePreviewCard points={userData.totalPoint} variant="facility" />
      <NewsCard />
      <div className="flex flex-col gap-base absolute bottom-base right-0 left-0 px-base">
        <MButton variant="primary" className="text-white" full onClick={() => { window.location.href = "http://localhost:4000/location/register"; }}>Add Drop-off Location</MButton>
        <ScanQRButton />
      </div >
    </>
  )
}

export default FacilityHomePage;
