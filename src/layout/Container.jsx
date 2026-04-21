import { Box } from "@chakra-ui/react";

function Container({ children }) {
  return (
    <Box
      maxW="1200px"
      mx="auto"
      px={{ base: 4, md: 6, lg: 8 }} // 👈 SAME padding everywhere
    >
      {children}
    </Box>
  );
}

export default Container;
