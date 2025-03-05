import { Home, Award, SendHorizontal, MapPin, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiGift, FiPlus, FiMapPin, FiUser } from "react-icons/fi";

const MBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
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
      </div>
    </div>
  );
};

export default MBottomNavigation;
