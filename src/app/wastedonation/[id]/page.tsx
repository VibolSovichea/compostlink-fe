"use client";

import Base from "@/components/shared/base-layout";
import WasteDonationForm from "@/components/shared/waste-donation-form";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const WasteDonationPage = () => {
  const id = useParams<{ id: string }>();
  const facilityId = Cookies.get("user_id");
  return (
    <Base hideNavigation headerVariant="return-button" headerContent={{
      pageTitle: "Donation Form"
    }}>
      <div className="mt-16 px-base">
        <WasteDonationForm facilityId={facilityId as string} generatorId={id.id} />
      </div>
    </Base>
  );
};

export default WasteDonationPage;

