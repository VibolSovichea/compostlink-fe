import { Box, Flex } from "@chakra-ui/react";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const MBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
    },
    {
      icon: Plus,
      label: "Add",
      path: "/add",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      path: "/messages",
    },
    {
      icon: User,
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
          <div className="w-full cursor-pointer" key={item.label}>
            {item.label === "Add" ? (
              <div className="flex justify-center items-center">
                <item.icon size={72} className="bg-white rounded-full p-2 mt-[-40px] text-primary shadow-xl"/>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center gap-1">
                <item.icon size={24} />
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
