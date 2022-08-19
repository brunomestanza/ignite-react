import { Button, Flex, Icon, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdNavigateBefore } from 'react-icons/md';
export function Header() {
  const router = useRouter();

  return (
    <Flex align='center' justify='center' h='100px' maxW='1440px' mx='auto' padding={2} position='relative'>
      { router.asPath !== '/' && <Button variant='unstyled' position='absolute' left={0} mt={4}><Icon as={MdNavigateBefore} w={8} h={8} /></Button> }
      <Image alt="World trip logo" src="./logo.png"/>
    </Flex>
  );
};
