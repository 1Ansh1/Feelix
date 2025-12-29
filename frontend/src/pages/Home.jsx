import {
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TextType from "../reactbits/TextType";
import LightPillar from "../reactbits/LightPillar";

const Home = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.75)",
    "rgba(26,32,44,0.75)"
  );

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* ===== FULL PAGE REACTBITS BACKGROUND ===== */}
      <Box position="fixed" inset={0} zIndex={0}>
        <LightPillar />
      </Box>

      {/* ===== PAGE CONTENT ===== */}
      <Stack spacing={20} position="relative" zIndex={1} pt="100px">
        {/* ===== HERO ===== */}
        <Box
          minH="70vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={6}
        >
          <Stack spacing={6} maxW="900px">
            <Heading
              size="4xl"
              fontWeight="extrabold"
              color={useColorModeValue("gray.900", "white")}
            >
              Feelix
            </Heading>

            <Text
              fontSize="x1"
              fontWeight="medium"
              color={useColorModeValue("gray.800", "white")}
              minH="32px"
            >
              <TextType
                texts={[
                  "Real-Time Sentiment Analysis",
                  "Voice, Facial & Emotion Intelligence",
                  "AI-Powered Customer Feedback",
                ]}
              />
            </Text>

            <Text
              color={useColorModeValue("gray.700", "gray.300")}
              fontSize="md"
            >
              Feelix captures and analyzes customer emotions in real time using
              facial expressions, live speech recognition, and transformer-based
              sentiment analysis.
            </Text>
            
              <Button
                as={Link}
                to="/capture"
                px={10}
                py={6}
                fontSize="lg"
                fontWeight="semibold"
                alignSelf="center"
                color={useColorModeValue("gray.900", "white")}
                bg={useColorModeValue(
                  "rgba(255,255,255,0.6)",
                  "rgba(255,255,255,0.08)"
                )}
                border="1px solid"
                borderColor={useColorModeValue(
                  "rgba(0,0,0,0.1)",
                  "rgba(255,255,255,0.15)"
                )}
                rounded="full"
                backdropFilter="blur(14px)"
                boxShadow="0 8px 24px rgba(0,0,0,0.15)"
                transition="all 0.25s ease"
                _hover={{
                  transform: "scale(1.05)",
                  bg: useColorModeValue(
                    "rgba(255,255,255,0.8)",
                    "rgba(255,255,255,0.15)"
                  ),
                  boxShadow: "0 12px 32px rgba(99,102,241,0.35)",
                }}
                _active={{
                  transform: "scale(0.98)",
                }}
              >
                Start Live Feedback
              </Button>
          </Stack>
        </Box>

        {/* ===== FEATURES ===== */}
        <Stack spacing={10} px={6}>
          <Heading size="lg" textAlign="center">
            What Feelix Can Do
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                title: "🎥 Facial Emotion Detection",
                text: "Detect emotions from live webcam input using face-api.js, processed entirely in the browser.",
              },
              {
                title: "🎙️ Speech-Based Feedback",
                text: "Capture spoken feedback in real time using browser speech recognition APIs.",
              },
              {
                title: "🧠 AI Sentiment Analysis",
                text: "Analyze customer sentiment with high accuracy using transformer-based models.",
              },
            ].map((item) => (
              <Box
                key={item.title}
                bg={cardBg}
                p={6}
                rounded="xl"
                shadow="lg"
                backdropFilter="blur(14px)"
              >
                <Heading size="md" mb={2}>
                  {item.title}
                </Heading>
                <Text color={textColor}>{item.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
