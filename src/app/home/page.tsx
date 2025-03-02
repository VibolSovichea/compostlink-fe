"use client";

import Base from "@/components/shared/base-layout";
import { useAuth } from "@/provider/authProvider";
import UserHomePage from "@/components/home/user/user-home-page";

export default function HomePage() {
  const { userRole } = useAuth();
  return (
    <Base insideClassName="flex flex-col gap-6">
      {userRole === "User" ? (
        <UserHomePage/>
      ): (
        <div></div>
      )}      
    </Base>
  );
}