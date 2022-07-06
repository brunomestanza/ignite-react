import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
  // No React temos a declaração do componente através do nome ou referência, como por exemplo Header, e temos por declaração, que seria <Header />. Quando queremos tipar a referência, usamos o React.ElementType.
  icon: React.ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    // O passHref é utilizado para que possamos dar o feedback visual do link que está sendo clicado pelo usuário na parte inferior do navegador
    <ActiveLink href={href} passHref>
      <ChakraLink alignItems="center" display="flex" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text fontWeight="medium" ml="4">{children}</Text>
      </ChakraLink>
    </ActiveLink> 
  );
};
