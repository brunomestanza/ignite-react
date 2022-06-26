import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps{
  // No React temos a declaração do componente através do nome ou referência, como por exemplo Header, e temos por declaração, que seria <Header />. Quando queremos tipar a referência, usamos o React.ElementType.
  icon: React.ElementType;
  children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link alignItems="center" display="flex" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text fontWeight="medium" ml="4">{children}</Text>
    </Link>
  );
};
