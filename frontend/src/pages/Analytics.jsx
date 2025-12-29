import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API_BASE from "../config/api";

const COLORS = {
  POSITIVE: "#38A169",
  NEGATIVE: "#E53E3E",
  NEUTRAL: "#D69E2E",
};

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/api/analytics/summary`).then((res) => {
      setData(res.data);
    });
  }, []);

  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.75)",
    "rgba(255,255,255,0.06)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.12)",
    "rgba(255,255,255,0.12)"
  );

  if (!data) {
    return <Text px={10}>Loading analytics...</Text>;
  }
  const normalizedSentiments = data.sentiments.map((s) => ({
    label: s._id ?? "NEUTRAL",
    count: s.count,
    avgConfidence: s.avgConfidence,
  }));

  return (
    <Stack spacing={12} px={{ base: 4, md: 10 }} py={10}>
      {/* ================= HEADER ================= */}
      <Stack textAlign="center">
        <Heading size="xl">Analytics Dashboard</Heading>
        <Text color="gray.400">
          Visual insights from captured customer emotions
        </Text>
      </Stack>

      <Divider />

      {/* ================= SUMMARY CARDS ================= */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        <Box
          bg={glassBg}
          p={6}
          rounded="xl"
          border={`1px solid ${borderColor}`}
        >
          <Stat>
            <StatLabel>Total Feedback</StatLabel>
            <StatNumber>{data.total}</StatNumber>
          </Stat>
        </Box>

        {normalizedSentiments.map((s) => {
          const label = s.label;
          const color = COLORS[label] || "#CBD5E0";

          return (
            <Box
              key={label + s.count}
              bg={glassBg}
              p={6}
              rounded="xl"
              border={`1px solid ${color}`}
            >
              <Stat>
                <StatLabel>{label}</StatLabel>
                <StatNumber color={color}>{s.count}</StatNumber>
                <Text fontSize="sm" color="gray.400">
                  Avg confidence {(s.avgConfidence * 100).toFixed(1)}%
                </Text>
              </Stat>
            </Box>
          );
        })}
      </SimpleGrid>

      {/* ================= CHARTS ================= */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* PIE CHART */}
        <Box bg={glassBg} p={6} rounded="xl">
          <Heading size="md" mb={4}>
            Sentiment Distribution
          </Heading>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={normalizedSentiments}
                dataKey="count"
                nameKey="label"
                outerRadius={90}
              >
                {normalizedSentiments.map((s) => (
                  <Cell key={s.label} fill={COLORS[s.label]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* BAR CHART */}
        <Box bg={glassBg} p={6} rounded="xl">
          <Heading size="md" mb={4}>
            Sentiment Comparison
          </Heading>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={normalizedSentiments}>
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {normalizedSentiments.map((s) => (
                  <Cell key={s.label} fill={COLORS[s.label]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* ================= RECENT FEEDBACK ================= */}
      <Box bg={glassBg} p={6} rounded="xl">
        <Heading size="md" mb={4}>
          Recent Feedback
        </Heading>

        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Text</Th>
              <Th>Sentiment</Th>
              <Th isNumeric>Confidence</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.recent.map((f) => (
              <Tr key={f._id}>
                <Td maxW="300px" isTruncated>
                  {f.text}
                </Td>
                <Td color={COLORS[f.sentiment]}>{f.sentiment}</Td>
                <Td isNumeric>{(f.confidence * 100).toFixed(2)}%</Td>
                <Td>{new Date(f.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
};

export default Analytics;
