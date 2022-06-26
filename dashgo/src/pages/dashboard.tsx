import { Flex, SimpleGrid } from '@chakra-ui/react';
import { DashboardChart } from '../components/DashboardPage/DashboardChart';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        mx="auto"
        my="6"
        maxWidth={1480}
        px="6"
        w="100%"
      >
        <Sidebar />
        {/* O minChildWidth é utilizado para que possamos deixar os itens dentro do SimpleGrid, responsivos de forma automatizada, porque quando a tela for fica menor que 320px de largura, ele quebra a linha e coloca esses itens pra baixo. */}
        <SimpleGrid
          alignItems="flex-start"
          flex="1"
          gap="4"
          minChildWidth="320px"
        >
          <DashboardChart title='Inscritos da semana' />
          <DashboardChart title='Taxa de abertura' />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
