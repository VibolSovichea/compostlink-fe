"use client";

import Base from "@/components/shared/base-layout";
import { useAuth } from "@/provider/authProvider";
import UserHomePage from "@/components/home/user/user-home-page";
import FacilityHomePage from "@/components/home/facility/facility-home-page";

export default function HomePage() {
  const { userRole } = useAuth();
  return (
    <Base  hideNavigation={userRole === "User" ? false : true}>
      {userRole === "User" ? (
        <UserHomePage />
      ) : (
        <FacilityHomePage />
      )}
    </Base>
  );
}