import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
}

// isCurrent recebe o valor de false, porque pode não ter esse valor vindo do props. Mesmo o código funcionando sem a declaração é legal colocar. 
export function PaginationItem({ number, isCurrent = false }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
      colorScheme="pink"
      disabled
      fontSize="xs"
      size="sm"
      width="4"
      _disabled={{
        bg: "pink.500",
        cursor: "default",
      }}
      >
        {number}
      </Button>
    );
  } else {
    return (
      <Button
      bg="gray.700"
      fontSize="xs"
      size="sm"
      width="4"
      _hover={{
        bg: "gray.500",
      }}
      >
        {number}
      </Button>
    );
  };
};
