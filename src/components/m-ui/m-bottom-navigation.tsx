import { Home, Award, SendHorizontal, MapPin, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiGift, FiPlus, FiMapPin, FiUser } from "react-icons/fi";
import { useState } from "react";

const MBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // State to keep track of the active icon
  const [activePath, setActivePath] = useState(pathname);

  const navigationItems = [
<<<<<<< HEAD
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
=======
    {
      icon: Home,
      isActive: pathname === "/home",
      label: "Home",
      path: "/home",
    },
    {
      icon: Award,
      isActive: pathname === "/reward",
      label: "Reward",
      path: "/reward",
    },
    {
      icon: SendHorizontal,
      isActive: pathname === "/request",
      label: "Request",
      path: "/request",
    },
    {
      icon: MapPin,
      isActive: pathname === "/location",
      label: "Location",
      path: "/location",
    },
    {
      icon: User,
      isActive: pathname === "/profile",
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div
      className="fixed sm:absolute bottom-0 left-0 right-0 bg-primary h-14"
    >
      <div className="flex items-center h-full">
        {navigationItems.map((item) => (
          <div 
          className="w-full cursor-pointer" 
          key={item.label}
          onClick={() => router.push(item.path)}
          >
            {item.label === "Request" ? (
              <div className="flex justify-center items-center">
                <item.icon size={64} className="bg-white rounded-full p-4 mt-[-40px] text-primary shadow-xl"/>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center gap-1">
                <item.icon size={24} className={`${item.isActive ? "fill-white text-transparent" : "text-white"}`}/>
                <p className="text-xs">{item.label}</p>
              </div>
            )}
          </div>
        ))}
>>>>>>> origin/feat/authToHome
      </div>
    </div>
  );
};

export default MBottomNavigation;
