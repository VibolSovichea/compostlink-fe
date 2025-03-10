"use client";

import Base from "@/components/shared/base-layout";
import { useAuth } from "@/provider/authProvider";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import UserIcon from "@/../public/assets/icons/avatar-icon.svg";
import Image from "next/image";
import { useProfileQuery } from "@/redux/slices/dataSlice";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/redux/slices/data.types";

export default function ProfilePage() {
  const userId = Cookies.get("user_id");
  const { data } = useProfileQuery(userId || "");
  const [profile, setProfile] = useState<User | null>(null);
  const { logout } = useAuth();


  const menuItems = [
    { title: "Edit Profile", href: "/profile/edit" },
    { title: "Point History", href: "/profile/points" },
    { title: "Language", href: "/language" },
    {
      title: "Log Out",
      href: "#",
      onClick: () => {
        logout();
      }
    },
  ];

  useEffect(() => {
    data && setProfile(data);
  }, [data]);

  return useMemo(() => (
    profile ? (
      <Base>
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
        <div className="flex flex-col gap-4 p-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.onClick ? (
                <button
                  className="w-full py-4 flex justify-between items-center border-b border-gray-100"
                  onClick={item.onClick}
                >
                  <span className="text-black">{item.title}</span>
                  <FiChevronRight className="w-6 h-6 text-gray-400" />
                </button>
              ) : (
                <Link href={item.href}>
                  <div className="w-full py-4 flex justify-between items-center border-b border-gray-100">
                    <span className="text-black">{item.title}</span>
                    <FiChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Base>
    ) : (
      <Base>
        <div></div> // 
      </Base>
    )
  ), [profile]);
}