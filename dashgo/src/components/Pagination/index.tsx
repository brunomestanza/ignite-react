import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

// QUantia de páginas irmãs que aparecem ao lado da página atual, exemplo, 4 e 6 são páginas irmãs da página 5
const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0);
};

export function Pagination({ totalCountOfRegisters, registersPerPage = 10, currentPage = 1, onPageChange }: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [];
  
  return (
    <Stack
      align="center"
      direction={["column", "row"]}
      justify="space-between"
      mt="8"
      spacing="6"
    >
      <Box>
        <Text as="strong">0</Text> - <Text as="strong">10</Text> de <Text as="strong">100</Text>
      </Box>
      <HStack spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            { currentPage > (2 + siblingsCount) && <Text color='gray.300' width='8' textAlign='center'>...</Text> }
          </>
        )}
        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}
        {(currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && <Text color='gray.300' width='8' textAlign='center'>...</Text> }
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
};
