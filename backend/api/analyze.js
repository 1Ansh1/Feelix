import mongoose from "mongoose";
import Sentiment from "sentiment"; // placeholder for now

// connect Mongo (reuse connection in serverless)
if (!mongoose.connection.readyState) {
  await mongoose.connect(process.env.MONGO_URI);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text } = req.body;

  // TEMP sentiment (we’ll replace with transformer in Day 4)
  const analyzer = new Sentiment();
  const result = analyzer.analyze(text);
  const sentiment = result.score >= 0 ? "POSITIVE" : "NEGATIVE";

  // log to Mongo (schema omitted for brevity)
  // await Feedback.create({ text, sentiment });

  res.json({ sentiment, confidence });

}
