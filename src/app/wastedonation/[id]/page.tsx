"use client";

import Base from "@/components/shared/base-layout";
import WasteDonationForm from "@/components/shared/waste-donation-form";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import SuccessDialog from "@/components/shared/success-dialog";
import { useState } from "react"; 
// Please use this
const WasteDonationPage = () => {
  const id = useParams<{ id: string }>();
  const facilityId = Cookies.get("user_id");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const onSuccess = () => {
    setSuccessDialogOpen(true);
  }

  const onOpenChange = (open: boolean) => {
    setSuccessDialogOpen(open);
    if (!open) {
      window.location.href = "/home";
    }
  }

  return (
    <Base hideNavigation headerVariant="return-button" headerContent={{
      pageTitle: "Donation Form"
    }}>
      <div className="mt-16 px-base">
        <WasteDonationForm facilityId={facilityId as string} generatorId={id.id} onSuccess={onSuccess} />
      </div>
      <SuccessDialog open={successDialogOpen} onOpenChange={onOpenChange} description="Waste donation successful" animation={true} />
    </Base>
  );
};

export default WasteDonationPage;

