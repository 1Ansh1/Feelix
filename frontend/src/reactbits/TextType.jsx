import { useEffect, useState } from "react";

const TextType = ({ texts = [], speed = 80, pause = 1500 }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, pause);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex, texts, speed, pause]);

  return (
    <span>
      {displayText}
      <span style={{ opacity: 0.7 }}>|</span>
    </span>
  );
};

export default TextType;
