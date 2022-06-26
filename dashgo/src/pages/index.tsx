import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justify="center">
      <Flex
        as="form"
        bg="gray.800"
        borderRadius={8}
        flexDir="column"
        maxW={360}
        p="8"
        w="100%"
      >
        {/* O stack é uma caixa que recebe conteúdos filhos dentro de si, e que consegue dar um espaçamento nesses conteúdos, que passamos pra ele no spacing */}
        <Stack spacing={4}>
          {/* O FormControl e responsável por receber o input e o seu label */}
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </Stack>
        <Button
          colorScheme="pink"
          mt={6}
          type="submit"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};
