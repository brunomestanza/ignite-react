import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationNav() {
  return (
    // O HStack funciona de forma identica ao Stack, porém de maneira horizontal, o Stack normalmente funciona de forma vertical.
    <HStack
      borderRightWidth={1}
      borderColor="gray.700"
      color="gray.300"
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      spacing={["6", "8"]}
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  );
};
