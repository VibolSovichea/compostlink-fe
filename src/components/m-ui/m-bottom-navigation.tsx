import { Box, Flex } from "@chakra-ui/react";
import { Home, Award, SendHorizontal, MapPin, User } from "lucide-react";
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
      icon: Award,
      label: "Reward",
      path: "/reward",
    },
    {
      icon: SendHorizontal,
      label: "Request",
      path: "/request",
    },
    {
      icon: MapPin,
      label: "Location",
      path: "/location",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
      zIndex={50}
    >
      <Flex justify="space-around" py={3}>
        {navigationItems.map((item) => (
          <Flex
            key={item.label}
            direction="column"
            align="center"
            onClick={() => router.push(item.path)}
            cursor="pointer"
            color={pathname === item.path ? "primary" : "gray.500"}
            className="transition-colors duration-200 hover:text-primary"
          >
            <item.icon size={24} />
            <Box fontSize="xs" mt={1}>
              {item.label}
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default MBottomNavigation;
