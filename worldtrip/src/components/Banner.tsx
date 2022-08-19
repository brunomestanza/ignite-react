import { Box, Flex, Image, Text } from "@chakra-ui/react";

export function Banner() {
  return (
    <Flex
      w="100%"
      px={['4', '35']}
      py={['7', '20']}
      bgImage='./banner-background.png'
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgAttachment="fixed"
    >
      <Flex w="100%" maxW="1240px" m="0 auto" position="relative">
        <Box maxW="530px">
          <Text fontWeight="medium" fontSize={['xl', '4xl']} color="white">
            5 Continentes,<br />infinitas possibilidades.
          </Text>
          <Text fontWeight="normal" fontSize={['sm', 'xl']} color="gray.50" mt={['2', '5']}>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>
          <Box position="absolute" top="0" right="0">
            <Image src="./airplane.png" alt="airplane" />
          </Box>
      </Flex>
    </Flex>
  );
};
