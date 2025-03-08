"use client";

import ProfilePreviewCard from "@/components/home/profile-preview-card";
import Base from "@/components/shared/base-layout";
import WasteDonationForm from "@/components/shared/waste-donation-form";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const WasteDonationPage = () => {
  const id = useParams<{ id: string }>();
  const facilityId = Cookies.get("user_id");
  return (
    <Base hideNavigation>
      {/* <ProfilePreviewCard userId={facilityId as string} /> */}
      <WasteDonationForm facilityId={facilityId as string} generatorId={id.id} />
    </Base>
  );
};

export default WasteDonationPage;

