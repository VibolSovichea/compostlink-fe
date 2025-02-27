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
    <div className="fixed bottom-0 left-0 right-0 bg-green-400 py-3 px-6">
      <div className="flex justify-between items-center text-white">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              item.icon === FiPlus ? "-mt-8" : ""
            }`}
            onClick={() => router.push(item.path)}
          >
            {item.icon === FiPlus ? (
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <item.icon className="text-3xl text-green-400" />
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
