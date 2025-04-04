import { Home, Award, MapPin, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

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
    <>
      <div className="absolute bottom-0 left-0 right-0 w-full h-12 bg-secondary" />
      <div
        className="fixed sm:absolute bottom-base left-base right-base bg-primary h-14 rounded-xl z-20"
      >
        <div className="flex items-center h-full">
          {navigationItems.map((item) => (
            <div
              className="w-full cursor-pointer"
              key={item.label}
              onClick={() => {
                router.push(item.path || "/home");
              }}
            >
              {item.label === "Achievement" ? (
                <div className="flex justify-center items-center">
                  <item.icon size={24} className={`${item.isActive ? "fill-white text-white" : "text-white"}`} />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center gap-1">
                  <item.icon size={24} className={`${item.isActive ? "fill-white text-transparent" : "text-white"}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default MBottomNavigation;
