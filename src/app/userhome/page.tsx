"use client";

import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useAuth } from "@/provider/authProvider";
import ProfilePreviewCard from "@/components/home/profile-preview-card";
import ScanQRButton from "@/components/shared/scan-qr-button";
import NewsCard from "@/components/home/news-card";
import Cookies from "js-cookie";
export default function UserHomePage() {
  const { logout } = useAuth();
  const userId = Cookies.get('user_id');

  console.log(userId);

  return (
    <Base insideClassName="flex flex-col gap-6">
      <ProfilePreviewCard userId={userId || ""} />
      <ScanQRButton />
      <NewsCard />
      <MButton variant="secondary" full onClick={() => {
        alert("Logout");
        logout();
      }}>
        Logout
      </MButton>
    </Base>
  );
}