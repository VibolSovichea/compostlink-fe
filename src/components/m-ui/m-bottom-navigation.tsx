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
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
    >
      <Flex justify="space-around" py={2}>
        {navigationItems.map((item) => (
          <Flex
            key={item.label}
            direction="column"
            align="center"
            onClick={() => router.push(item.path)}
            cursor="pointer"
            color={pathname === item.path ? "primary" : "gray.500"}
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
