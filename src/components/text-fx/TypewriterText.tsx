import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseTime = 1800,
  className = '',
  cursorClassName = '',
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < fullPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at full phrase before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span
        className={`inline-block w-0.5 h-[1.1em] ml-1 bg-amber-400 animate-pulse align-middle shadow-[0_0_8px_#f59e0b] ${cursorClassName}`}
      />
    </span>
  );
};
