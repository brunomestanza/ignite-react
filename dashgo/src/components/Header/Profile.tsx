import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        // O box funciona de maneira identica a Flex, porém sem estilização prévia.
        <Box mr="4" textAlign="right">
          <Text>Bruno Mestanza</Text>
          <Text color="gray.300" fontSize="small">brunommestanza@gmail.com</Text>
        </Box>
      )}
      {/* O Avatar consegue receber uma propriedade name, que carrega caso não tenhamos uma imagem de perfil, ou enquanto ela está no processo de loading, com as iniciais do nome. */}
      <Avatar size="md" name='Bruno Mestanza' src='https://github.com/brunomestanza.png'></Avatar>
    </Flex>
  );
};
