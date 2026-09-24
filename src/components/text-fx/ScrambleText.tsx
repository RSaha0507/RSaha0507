import React, { useState, useEffect, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  autoTriggerInterval?: number;
  scrambleSpeed?: number;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________010101XYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  triggerOnHover = true,
  autoTriggerInterval = 0,
  scrambleSpeed = 28,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 2.5;
    }, scrambleSpeed);
  }, [text, isScrambling, scrambleSpeed]);

  useEffect(() => {
    // Initial scramble on mount
    startScramble();
  }, [text]);

  useEffect(() => {
    if (autoTriggerInterval <= 0) return;
    const interval = setInterval(() => {
      startScramble();
    }, autoTriggerInterval);

    return () => clearInterval(interval);
  }, [autoTriggerInterval, startScramble]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) startScramble();
      }}
      className={`inline-block font-mono cursor-pointer transition-colors select-none ${
        isScrambling ? 'text-amber-300 text-glow-amber' : ''
      } ${className}`}
      title="Hover to decode matrix text"
    >
      {displayText}
    </span>
  );
};
