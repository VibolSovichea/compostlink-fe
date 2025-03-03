"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiGift, FiPlus, FiMapPin, FiUser } from "react-icons/fi";
import { useState } from "react";

const MBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // State to keep track of the active icon
  const [activePath, setActivePath] = useState(pathname);

  const navigationItems = [
    { icon: FiHome, label: "Home", path: "/userhome" },
    { icon: FiGift, label: "Rewards", path: "/reward" },
    { icon: FiPlus, label: "Request", path: "/request" },
    { icon: FiMapPin, label: "Location", path: "/location" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-400 py-3 px-6 ">
      <div className="flex justify-between items-center text-white">
        {navigationItems.map((item, index) => {
          const isActive = activePath === item.path; // Check if the item is active
          
          return (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                item.icon === FiPlus ? "mt-[]" : "" // Adjusts the icon container height for FiPlus
              }`}
              
              
              onClick={() => {
                setActivePath(item.path); // Update active path
                router.push(item.path);
              }}
            >
              {/* Smaller size for the icon background */}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                  isActive ? "bg-white" : "bg-transparent"
                }`}
              >
                <item.icon
                  className={`text-2xl transition-all ${
                    isActive ? "text-green-400" : "text-white"
                  }`}
                />
              </div>
              
              {/* Label text */}
              {item.label && (
                <span className="text-sm">{item.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MBottomNavigation;
