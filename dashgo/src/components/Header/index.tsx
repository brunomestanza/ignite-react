import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = useSidebarDrawer();
  // Usamos o hook do chakra abaixo para que possamos verificar o tamanho da tela através de um breakpoint, renderizando ou não o componente de profile
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      align="center"
      height="20"
      mt="4"
      mx="auto"
      maxWidth={1480}
      px="6"
      w="100%"
    >
      { !isWideVersion && (
        <IconButton
          aria-label='Open navigation'
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          mr="2"
          onClick={onOpen}
          variant="unstyled"
        >

        </IconButton>
      )}
      <Logo />
      { isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};
