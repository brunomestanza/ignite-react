import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();
  // A diferença de usar a mutation ao invés da request normal, é que podemos acompanhar o andamento da mutation, como loading quantia de falhas, e afins
  const createUser = useMutation(async (user : CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(), // Mirage cuida disso de forma automática, é escrito assim por conta da nomenclatura do mirage
      }
    });

    return response.data.user;
  }, {
    // No sucesso da mutation, invalidamos o cache para que o novo dado seja adicionado
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values ) => {
    await createUser.mutateAsync(values);
    router.push('/users');
  }

  return (
    <Box>
      <Header />
      <Flex
        as="form"
        mx="auto"
        my="6"
        maxWidth={1480}
        px="6"
        w="100%"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Sidebar />
        <Box
          bg="gray.800"
          borderRadius={8}
          flex="1"
          p="8"
        >
          <Heading fontWeight="normal" size="lg">Criar usuário</Heading>
          <Divider borderColor="gray.700" my="6" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input label="Nome completo" name="name" {...register("name")} error={errors.name} />
              <Input label="E-mail" name="email" type="email" {...register("email")} error={errors.email} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input label="Senha" name="password" type="password" {...register("password")} error={errors.password} />
              <Input label="Confirmação da senha senha" name="password_confirmation" type="password" {...register("password_confirmation")} error={errors.password_confirmation} />
            </SimpleGrid>
          </VStack>
          <Flex justify="flex-end" mt="8">
             <HStack spacing="4">
              <Link href='/users' passHref>
                <Button as='a' colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
             </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
