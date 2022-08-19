import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    body: "Poppins",
    heading: "Poppins",
    mono: "Poppins",
  },
  colors: {
    white: '#F5F8FA',
    gray: {
      50: '#DADADA',
      600: '#47585B',
    },
  },
});
