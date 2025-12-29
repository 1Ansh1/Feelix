import {
  Box,
  Flex,
  Button,
  Heading,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../assets/feelix-logo.png";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(26, 32, 44, 0.7)"
  );

  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.05)",
    "rgba(255, 255, 255, 0.08)"
  );

  return (
    <Box
      position="sticky"
      top={4}
      zIndex={100}
    >
      {/* Floating Glass Container */}
      <Flex
        maxW="1000px"
        mx="auto"
        px={6}
        py={3}
        align="center"
        justify="space-between"
        bg={glassBg}
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="lg"
      >
        {/* LOGO + BRAND */}
        <HStack spacing={4}>
          <Image
            src={logo}
            alt="Feelix logo"
            boxSize="48px"
            objectFit="contain"
            transform="scale(3.1)"
            transformOrigin="left center"
            pointerEvents="none"
          />

        </HStack>

        {/* NAV LINKS */}
        <Flex gap={2} align="center">
          <Button as={Link} to="/" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/capture" variant="ghost">
            Capture
          </Button>
          <Button as={Link} to="/analytics" variant="ghost">
            Analytics
          </Button>
          <Button as={Link} to="/about" variant="ghost">
            About
          </Button>

          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
