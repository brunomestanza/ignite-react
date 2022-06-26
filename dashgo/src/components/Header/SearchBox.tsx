import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";

export function SearchBox() {
  return (
    // Usamos de uma flex como label, para que seja mais simples a implementação do input, porque como ele possui um icone, dessa forma, nosso input recebe o foco caso o usuário clique no input em si, ou no icone.
    <Flex
      alignSelf="center"
      as="label"
      bg= "gray.800"
      borderRadius="full"
      color="gray.200"
      flex="1"
      maxWidth={400}
      ml="6"
      position="relative"
      px="8"
      py="4"
    >
      <Input
        color="gray.50"
        mr="4"
        placeholder="Buscar na plataforma"
        px="4"
        variant="unstyled"
        _placeholder={{ color: 'gray.400' }} // Essa estilização é aplicada apenas ao placeholder
      />
      {/* É recomendado que quando utilizemos uma biblioteca de terceiros para icones, utilizemos o ícone dentro do Icon do chakra */}
      <Icon as={RiSearch2Line} fontSize="20" />
    </Flex>
  );
};
