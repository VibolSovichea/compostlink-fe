"use client";

import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";

import { User } from "@/redux/slices/data.types";
import { useAuth } from "@/provider/authProvider";
import Base from "@/components/shared/base-layout";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import UserHomePage from "@/components/home/user/user-home-page";
import FacilityHomePage from "@/components/home/facility/facility-home-page";
import { Loader2 } from "lucide-react";
export default function HomePage() {
  const { userRole } = useAuth();
  const userId = Cookies.get('user_id');
  const { data } = useProfileQuery(userId || "");
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    data && setUserData(data);
  }, [data]);

  return useMemo(() => (
    userData ? (
      <Base hideNavigation={userRole === "User" ? false : true} headerVariant="default" headerContent={{ username: userData?.name }}>
        {userRole === "User" ? (
          userData ? <UserHomePage userData={userData} /> : null
        ) : (
          userData ? <FacilityHomePage userData={userData} /> : null
        )}
      </Base>
    ) : (
      <Base hideNavigation={true}>
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      </Base>
    )
  ), [userRole, userData]);
}