import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import FaceEmotion from "../components/FaceEmotion";
import SpeechToText from "../components/SpeechToText";
import { useState } from "react";
import axios from "axios";
import API_BASE from "../config/api";

const Capture = () => {
  const [sentiment, setSentiment] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranscript = async (text) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/analyze`, { text });
      setSentiment(res.data.sentiment);
      setConfidence(res.data.confidence);
    } catch (err) {
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- THEME VALUES ---------- */
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.75)",
    "rgba(255,255,255,0.06)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(255,255,255,0.12)"
  );

  const mutedText = useColorModeValue("gray.600", "gray.400");

  const glassButtonBg = useColorModeValue(
    "rgba(255,255,255,0.6)",
    "rgba(255,255,255,0.08)"
  );

  const glassButtonHover = useColorModeValue(
    "rgba(255,255,255,0.8)",
    "rgba(255,255,255,0.15)"
  );

  return (
    <Stack spacing={10} px={{ base: 4, md: 10 }} py={10} minH="100vh">
      {/* ================= HEADER ================= */}
      <Stack spacing={2} textAlign="center">
        <Heading size="xl">Live Feedback Capture</Heading>
        <Text color={mutedText}>
          Capture facial emotions and spoken feedback in real time
        </Text>
      </Stack>

      <Divider opacity={0.25} />

      {/* ================= MAIN GRID ================= */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* ================= LEFT CARD ================= */}
        <Box
          bg={cardBg}
          p={6}
          rounded="2xl"
          backdropFilter="blur(16px)"
          border={`1px solid ${borderColor}`}
        >
          <Stack spacing={4}>
            <Heading size="md">Facial Emotion Detection</Heading>
            <Text fontSize="sm" color={mutedText}>
              Real-time emotion detection using webcam input
            </Text>

            <FaceEmotion />
          </Stack>
        </Box>

        {/* ================= RIGHT CARD ================= */}
        <Box
          bg={cardBg}
          p={6}
          rounded="2xl"
          backdropFilter="blur(16px)"
          border={`1px solid ${borderColor}`}
        >
          <Stack spacing={5}>
            <Box>
              <Heading size="md">Speech Sentiment Analysis</Heading>
              <Text fontSize="sm" color={mutedText}>
                Speak naturally — sentiment is analyzed instantly
              </Text>
            </Box>

            {/* Speech Button */}
            <SpeechToText onTranscript={handleTranscript} />

            {/* Status */}
            {loading && (
              <Text color={mutedText} fontSize="sm">
                Analyzing sentiment…
              </Text>
            )}

            {/* Result */}
            {!loading && sentiment && confidence !== null && (
              <Box
                mt={2}
                p={4}
                rounded="xl"
                bg={useColorModeValue(
                  "rgba(0,0,0,0.03)",
                  "rgba(255,255,255,0.04)"
                )}
              >
                <Text fontSize="lg" fontWeight="semibold">
                  {sentiment}
                </Text>
                <Text fontSize="sm" color={mutedText}>
                  Confidence: {(confidence * 100).toFixed(2)}%
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default Capture;
