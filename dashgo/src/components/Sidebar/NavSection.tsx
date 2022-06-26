import { Box, Stack, Text } from "@chakra-ui/react";
 
interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text color="gray.400" fontSize="small" fontWeight="bold">{title}</Text>
      <Stack align="stretch" mt="8" spacing="4">
        {children}
      </Stack>
    </Box>
  );
};
