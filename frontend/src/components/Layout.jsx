import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
