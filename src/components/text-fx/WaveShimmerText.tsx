import React from 'react';

interface WaveShimmerTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

export const WaveShimmerText: React.FC<WaveShimmerTextProps> = ({
  text,
  className = '',
  gradient = 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 30%, #38bdf8 70%, #f59e0b 100%)',
}) => {
  return (
    <span
      className={`inline-block font-extrabold tracking-tight bg-clip-text text-transparent shimmer-text-animated ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% auto',
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block hover:-translate-y-1 transition-transform duration-200"
          style={{
            animation: `wave-bounce 2.5s ease-in-out infinite`,
            animationDelay: `${index * 0.06}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
