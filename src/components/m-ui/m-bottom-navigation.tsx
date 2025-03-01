"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiGift, FiPlus, FiMapPin, FiUser } from "react-icons/fi";

const MBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { icon: FiHome, label: "Home", path: "/userhome" },
    { icon: FiGift, label: "Rewards", path: "/reward" },
    { icon: FiPlus, label: "", path: "/request" },
    { icon: FiMapPin, label: "Location", path: "/location" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  return (
    <div
      className="fixed sm:absolute bottom-0 left-0 right-0 bg-primary h-14"
    >
      <div className="flex items-center h-full">
        {navigationItems.map((item) => (
          <div className="w-full cursor-pointer" key={item.label}>
            {item.label === "Request" ? (
              <div className="flex justify-center items-center">
                <item.icon size={64} className="bg-white rounded-full p-4 mt-[-40px] text-primary shadow-xl"/>
              </div>
            ) : (
              <>
                <item.icon className="text-2xl" />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBottomNavigation;
