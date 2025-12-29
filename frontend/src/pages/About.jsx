import {
  Box,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileCard from "../reactbits/ProfileCard";

import profileImage from "../assets/profile.png";

const About = () => {
  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.75)",
    "rgba(255,255,255,0.06)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.12)",
    "rgba(255,255,255,0.12)"
  );

  const mutedText = useColorModeValue("gray.600", "gray.400");

  return (
    <Box minH="100vh" px={{ base: 4, md: 10 }} py={12}>
      <Stack spacing={16} align="center">

        {/* ================= HEADER ================= */}
        <Stack spacing={2} textAlign="center">
          <Heading size="xl">About the Creator</Heading>
          <Text color={mutedText}>
            Meet the developer behind <b>Feelix</b>
          </Text>
        </Stack>

        {/* ================= PROFILE CARD ================= */}
        <ProfileCard
          avatarUrl={profileImage}
          miniAvatarUrl={profileImage}
          name="Ansh Upadhyay"
          title="Full Stack Developer"
          handle="1Ansh1"
          status="Building Feelix 🚀"
          contactText="GitHub"
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowEnabled={true}
          onContactClick={() =>
            window.open("https://www.github.com/1Ansh1", "_blank")
          }
        />

        {/* ================= ABOUT FEELIX ================= */}
        <Stack spacing={4} maxW="800px" textAlign="center">
          <Heading size="lg">About Feelix</Heading>
          <Text color={mutedText} fontSize="md" lineHeight="1.8">
            <b>Feelix</b> is a full-stack, AI-powered sentiment analysis platform
            designed to capture and interpret human emotions in real time.
            The system combines speech recognition, facial emotion detection,
            and transformer-based natural language processing to deliver
            meaningful emotional insights from live user interactions.
          </Text>
        </Stack>

        <Divider maxW="900px" />

        {/* ================= CORE CAPABILITIES ================= */}
        <Stack spacing={8} w="100%" maxW="1100px">
          <Heading size="lg" textAlign="center">
            Core Capabilities
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              bg={glassBg}
              p={6}
              rounded="xl"
              border={`1px solid ${borderColor}`}
            >
              <Heading size="md" mb={3}>
                🎙️ Live Speech Sentiment
              </Heading>
              <Text color={mutedText}>
                Converts spoken feedback into text using browser speech APIs
                and analyzes sentiment in real time using transformer-based
                NLP models via Hugging Face inference.
              </Text>
            </Box>

            <Box
              bg={glassBg}
              p={6}
              rounded="xl"
              border={`1px solid ${borderColor}`}
            >
              <Heading size="md" mb={3}>
                🎥 Facial Emotion Detection
              </Heading>
              <Text color={mutedText}>
                Detects facial expressions from live webcam input using
                client-side computer vision models, enabling real-time
                emotion recognition directly in the browser.
              </Text>
            </Box>

            <Box
              bg={glassBg}
              p={6}
              rounded="xl"
              border={`1px solid ${borderColor}`}
            >
              <Heading size="md" mb={3}>
                📊 Analytics Dashboard
              </Heading>
              <Text color={mutedText}>
                Aggregates sentiment data into interactive charts and tables,
                displaying confidence scores, trends, and recent feedback
                stored persistently in MongoDB.
              </Text>
            </Box>
          </SimpleGrid>
        </Stack>

        {/* ================= TECH STACK ================= */}
        <Stack spacing={6} maxW="1000px" w="100%">
          <Heading size="lg" textAlign="center">
            System Architecture & Tech Stack
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box bg={glassBg} p={6} rounded="xl">
              <Heading size="sm" mb={2}>
                Frontend
              </Heading>
              <Text color={mutedText}>
                React (Vite), Chakra UI, Browser Speech API, Webcam & Media APIs
              </Text>
            </Box>

            <Box bg={glassBg} p={6} rounded="xl">
              <Heading size="sm" mb={2}>
                Backend & AI
              </Heading>
              <Text color={mutedText}>
                Node.js, Express.js, REST APIs, Hugging Face Transformer Models
              </Text>
            </Box>

            <Box bg={glassBg} p={6} rounded="xl">
              <Heading size="sm" mb={2}>
                Database & Deployment
              </Heading>
              <Text color={mutedText}>
                MongoDB (Mongoose), Analytics Aggregation, Cloud Deployment
              </Text>
            </Box>
          </SimpleGrid>
        </Stack>

        {/* ================= YOUR ROLE ================= */}
        <Stack spacing={4} maxW="800px" textAlign="center">
          <Heading size="lg">My Role</Heading>
          <Text color={mutedText} lineHeight="1.8">
            I designed and developed the complete Feelix platform end-to-end,
            including frontend UI/UX, backend APIs, database modeling, AI model
            integration, and deployment. The project emphasizes real-time
            performance, scalable architecture, and production-ready design.
          </Text>
        </Stack>

      </Stack>
    </Box>
  );
};

export default About;
