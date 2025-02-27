"use client";

import Base from "@/components/shared/base-layout";
import WasteDonationForm from "@/components/shared/waste-donation-form";
import { useParams } from "next/navigation";

const WasteDonationPage = () => {
  const id = useParams<{ id: string }>();
  console.log(id);
  // facility id
  // generator id
  // waste type
  // weight
  return (
    <Base hideNavigation>
      <WasteDonationForm />
    </Base>
  );
};

export default WasteDonationPage;

