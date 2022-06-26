import { Box, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from 'apexcharts';
// Podemos usar o dynamic, para carregar o componente apenas quando ele for necessário, ou para que ele não seja carregado pelo servidor do Next, mas sim pelo cliente. Fazemos isso nesse caso, porque o Chart utiliza a window, que não existe no servidor do Next. Ele recebe como primeiro parâmetro qual a importação a ser feita, e como segundo parâmetro, ele recebe algumas opções, no caso nós estamos fazendo com que ele seja carregado apenas do lado do cliente, com a opção ssr: false.
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      formatter: function(val) {
        return new Date(val).toLocaleDateString('en-US',
        {
          day: '2-digit',
          month: 'short'
        });
      },
    },
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  { name: 'series-1', data: [31, 120, 10, 28, 61, 18, 109] },
]

interface DashboardChartProps {
  title: string;
}

export function DashboardChart({ title }: DashboardChartProps) {
  return (
    <Box
      bg="gray.800"
      borderRadius={8}
      p={["6", "8"]}
      pb="4"
    >
      <Text fontSize="lg" mb="4">{title}</Text>
      <Chart
        height={160}
        options={options} // São as configurações
        type='area'
        series={series} // São os dados do gráfico
      />
    </Box>
  );
};