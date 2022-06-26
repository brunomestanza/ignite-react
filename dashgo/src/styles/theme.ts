// Arquivo usado para alterações das estilizações padrão do chakra
// As importações SEMPRE devem ser feitas de @chakra-ui/react
import { extendTheme } from '@chakra-ui/react';

// Usamos como base o theme padrão do chakra, e substiuimos algumas coisas
export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#DDDDDD",
    },
  },
  fonts: {
    body: 'Roboto', // Fonte do corpo
    heading: 'Roboto', // Fonte dos cabeçalhos (headings)
    // mono:  Fontes monospaced, que ficam dentro de uma tag <code> ou pre 
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});