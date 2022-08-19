import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { Travel } from "../../types/travel";

export function TravelItem({ title, icon, hasDivider = false }: Travel) {
  return (
    <Flex flexDir='column' alignItems='center'>
      <Flex h='145px' flexDir='column'  justify='space-between' align='center'>
        <Image alt={title} src={icon} />
        <Text fontWeight='semibold' color='gray.600' fontSize='2xl'>{title}</Text>
      </Flex>
      { hasDivider && <Divider mt='80px' borderColor='gray.600' w='90px' borderBottomWidth='2px' /> }
    </Flex>
  );
};
