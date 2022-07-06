import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
            <Heading fontWeight="normal" size="lg">Usuários</Heading>
            <Link href='/users/create' passHref>
              <Button
                as="a"
                colorScheme="pink"
                fontSize="sm"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                size="sm"
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Bruno Mestanza</Text>
                    <Text color="gray.300" fontSize="sm">brunommestanza@gmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>04 de Abril, 2021</Td> }
              </Tr>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Bruno Mestanza</Text>
                    <Text color="gray.300" fontSize="sm">brunommestanza@gmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>04 de Abril, 2021</Td> }
              </Tr>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Bruno Mestanza</Text>
                    <Text color="gray.300" fontSize="sm">brunommestanza@gmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>04 de Abril, 2021</Td> }
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
};
