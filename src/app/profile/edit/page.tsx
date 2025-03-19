"use client";

import ProfileEditForm from "@/components/profile/profile-edit-form";
import Base from "@/components/shared/base-layout";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import { Loader2 } from "lucide-react";
import UserIcon from "@/../public/assets/icons/avatar-icon.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/redux/slices/data.types";

export default function ProfileEditPage() {
  const userId = Cookies.get("user_id");
  const { data: userData } = useProfileQuery(userId || "");
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    userData && setProfile(userData);
  }, [userData]);

  return useMemo(() => (
    <Base
      headerVariant="return-button"
      headerContent={{
        pageTitle: "Edit Profile",
      }}
      hideNavigation
    >
      {profile ? (
        <>
          <div className="flex justify-center my-10 flex-col items-center gap-base">
            <div className="aspect-square size-20">
              <Image
                src={UserIcon}
                alt=""
                width={100}
                height={100}
                className="size-full"
              />
            </div>
            <p className="text-lg text-black">{profile?.name}</p>
          </div>
          <ProfileEditForm profile={profile} />
        </>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      )}
    </Base>
  ), [profile]);
}