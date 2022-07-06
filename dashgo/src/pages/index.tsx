import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values)
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            error={errors.email}
            name="email"
            type="email"
            label="E-mail"
            {...register("email")}
          />
          <Input
            error={errors.password}
            name="password"
            type="password"
            label="Senha"
            {...register('password')}
          />
        </Stack>
        <Button
          colorScheme="pink"
          mt={6}
          type="submit"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};
