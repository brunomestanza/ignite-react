import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { User } from "../../types/user";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);
      return response.data;
    }, { staleTime: 1000 * 60 * 10 }) // 10 minutes of stale time
  }

  const { data, isLoading, isFetching, error } = useUsers(page, { initialData: users, });

  return (
    <Box>
      <Header />
      <Flex
        mx="auto"
        my="6"
        maxWidth={1480}
        px={["4", "4", "6"]}
        w="100%"
      >
        <Sidebar />
        <Box
          bg="gray.800"
          borderRadius={8}
          flex="1"
          p="8"
        >
          <Flex align="center" justify="space-between" mb="8">
            <Heading fontWeight="normal" size="lg">
              Usuários
              { !isLoading && isFetching && <Spinner size='sm' color="gray.500" ml='4' />}
            </Heading>
            <NextLink href='/users/create' passHref>
              <Button
                as="a"
                colorScheme="pink"
                fontSize="sm"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                size="sm"
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          { isLoading ? (
             <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th color="gray.300" px={["4", "4", "6"]} width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  { isWideVersion && <Th>Data de cadastro</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map((user: User) => {
                  return (
                    <Tr key={user.id}>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight='bold'>{user.name}</Text>
                        </Link>
                        <Text color="gray.300" fontSize="sm">{user.email}</Text>
                      </Box>
                    </Td>
                    { isWideVersion && <Td>{user.createdAt}</Td> }
                    </Tr>
                  )
                })}
              </Tbody>
              </Table>
              <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);
  return {
    props: {
      users,
    }
  }
}
