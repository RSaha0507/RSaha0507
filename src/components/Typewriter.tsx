import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per char
  deletingSpeed?: number; // ms per char
  delayBetweenWords?: number; // ms pause before deleting
  startDelay?: number; // ms delay before starting
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  onWordComplete?: (word: string, index: number) => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  delayBetweenWords = 1800,
  startDelay = 200,
  loop = true,
  cursor = true,
  cursorChar,
  cursorClassName = '',
  className = '',
  glow = true,
  glowColor = 'rgba(245, 158, 11, 0.65)',
  onWordComplete,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // Initial start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (isPaused || words.length === 0) return;

    const fullWord = words[currentWordIndex] || '';

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Word completed typing
        if (onWordComplete) {
          onWordComplete(fullWord, currentWordIndex);
        }

        // Pause before deleting if loop is on or there are more words
        if (loop || currentWordIndex < words.length - 1) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
        }
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        const nextIndex = (currentWordIndex + 1) % words.length;
        if (!loop && currentWordIndex === words.length - 1) {
          // Finished all words and not looping
          return;
        }
        setCurrentWordIndex(nextIndex);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
    loop,
    onWordComplete,
  ]);

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      style={{
        textShadow: glow ? `0 0 14px ${glowColor}, 0 0 26px ${glowColor}` : undefined,
      }}
    >
      {/* Animated Characters Rendering with Framer Motion */}
      <span className="inline-flex">
        {currentText.split('').map((char, index) => (
          <motion.span
            key={`${currentWordIndex}-${index}-${char}`}
            initial={{ opacity: 0, y: 3, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.15,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Framer Motion Blinking & Pulsing Glow Cursor */}
      {cursor && (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: [1, 0, 1],
              scaleY: [1, 0.95, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`inline-block ml-1 align-middle ${
              cursorChar
                ? `font-mono text-amber-400 font-bold ${cursorClassName}`
                : `w-0.5 sm:w-1 h-[1.15em] bg-amber-400 rounded-full shadow-[0_0_10px_#f59e0b,0_0_18px_#f59e0b] ${cursorClassName}`
            }`}
            aria-hidden="true"
          >
            {cursorChar || ''}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
};

export default Typewriter;
