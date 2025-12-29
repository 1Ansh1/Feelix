import { useEffect, useRef, useState } from "react";
import {
  Button,
  Box,
  Text,
  Alert,
  useColorModeValue,
} from "@chakra-ui/react";

const SpeechToText = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onTranscript(text);
      setListening(false);
    };

    recognition.onerror = (e) => {
      setError(e.error || "Speech recognition error");
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript]);

  const start = () => {
    setError("");
    setListening(true);
    recognitionRef.current?.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  /* ===== GLASS BUTTON THEME (UI ONLY) ===== */
  const buttonBg = useColorModeValue(
    "rgba(255,255,255,0.6)",
    "rgba(255,255,255,0.08)"
  );

  const buttonHoverBg = useColorModeValue(
    "rgba(255,255,255,0.8)",
    "rgba(255,255,255,0.15)"
  );

  const buttonText = useColorModeValue("gray.900", "white");

  return (
    <Box mt={6}>
      {error && (
        <Alert status="error" mb={3}>
          {error}
        </Alert>
      )}

      <Button
        onClick={listening ? stop : start}
        px={10}
        py={6}
        fontSize="md"
        fontWeight="semibold"
        rounded="full"
        color={buttonText}
        bg={buttonBg}
        backdropFilter="blur(14px)"
        border="1px solid rgba(255,255,255,0.2)"
        boxShadow="0 8px 24px rgba(0,0,0,0.15)"
        transition="all 0.25s ease"
        _hover={{
          transform: "scale(1.05)",
          bg: buttonHoverBg,
          boxShadow: "0 0 28px rgba(99,102,241,0.45)",
        }}
        _active={{
          transform: "scale(0.97)",
        }}
      >
        {listening ? "Stop Recording" : "Start Recording"}
      </Button>

      {listening && (
        <Text mt={3} fontSize="sm" color="teal.300">
          🎙️ Listening…
        </Text>
      )}
    </Box>
  );
};

export default SpeechToText;
