import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps }
from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput
        bgColor="gray.900"
        focusBorderColor="pink.500"
        id={name}
        name={name}
        size="lg"
        variant="filled"
        ref={ref}
        _hover={{
          bgColor: 'gray.900',
        }}
        {...rest}
      />

      { !!error && (<FormErrorMessage>{error.message}</FormErrorMessage>) }
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
