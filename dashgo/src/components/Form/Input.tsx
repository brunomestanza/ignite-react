import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

// Recebemos o rest para que possamos passar qualquer tipo de propriedade que um input possa receber, como tipo e afins, sem perder tempo com tipagem, ou passagem de parâmetros para o componente, o rest recebe um objeto com chave e valor.
export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {/* Utilizamos as duplas !! abaixo para que possamos forçar que o valor seja convertido para um valor booleano baseado em thuthy ou falsy, e com isso testamos se o valor da label existe ou não */}
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput
        bgColor="gray.900"
        focusBorderColor="pink.500"
        id={name}
        name={name}
        size="lg"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        {...rest}
      />
    </FormControl>
  );
};
