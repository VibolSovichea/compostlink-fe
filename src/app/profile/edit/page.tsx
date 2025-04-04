"use client";

import ProfileEditForm from "@/components/profile/profile-edit-form";
import Base from "@/components/shared/base-layout";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/redux/slices/data.types";
import Loading from "@/components/shared/loading";
import { avatars } from "@/utils/assets";

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
                src={profile?.role === "Facility" ? avatars.composterTwo : avatars.composterOne}
                alt=""
                width={100}
                height={100}
                className="size-full rounded-full"
              />
            </div>
            <p className="text-lg text-text_dark">{profile?.name}</p>
          </div>
          <ProfileEditForm profile={profile} />
        </>
      ) : (
        <Loading />
      )}
    </Base>
  ), [profile]);
}