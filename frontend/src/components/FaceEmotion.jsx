import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Box, Text } from "@chakra-ui/react";

const FaceEmotion = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });
  };

  const detectEmotion = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (detections && detections.expressions) {
      const expressions = detections.expressions;
      const maxEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      setEmotion(maxEmotion);
    }
  };

  return (
    <Box>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        onPlay={() => setInterval(detectEmotion, 500)}
        style={{ borderRadius: "10px" }}
      />
      <Text mt={3} fontSize="lg">
        Detected Emotion: <b>{emotion}</b>
      </Text>
    </Box>
  );
};

export default FaceEmotion;
