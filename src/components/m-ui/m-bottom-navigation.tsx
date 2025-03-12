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
    { icon: Home, label: "Home", path: "/userhome" },
    { icon: Award, label: "Reward", path: "/reward" },
    { icon: SendHorizontal, label: "Request", path: "/request" },
    { icon: MapPin, label: "Location", path: "/location" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-primary h-14">
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
                <item.icon size={24} className="text-white"/>
                <p className="text-xs">{item.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBottomNavigation;
