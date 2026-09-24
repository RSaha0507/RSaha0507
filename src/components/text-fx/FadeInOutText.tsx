import React, { useState, useEffect } from 'react';

interface FadeInOutTextProps {
  items: {
    prefix?: string;
    text: string;
    tag?: string;
    color?: string;
  }[];
  duration?: number;
  className?: string;
}

export const FadeInOutText: React.FC<FadeInOutTextProps> = ({
  items,
  duration = 3200,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeState('out');
    }, duration - 600);

    const changeIndexTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setFadeState('in');
    }, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeIndexTimer);
    };
  }, [index, duration, items.length]);

  const current = items[index];

  return (
    <div className={`inline-flex items-center min-h-[32px] overflow-hidden ${className}`}>
      <div
        className={`transition-all duration-500 transform flex items-center gap-2 ${
          fadeState === 'in'
            ? 'opacity-100 translate-y-0 filter blur-0 scale-100'
            : 'opacity-0 -translate-y-3 filter blur-[3px] scale-95'
        }`}
      >
        {current.prefix && (
          <span className="text-slate-400 font-medium">{current.prefix}</span>
        )}
        <span
          className="font-bold text-glow-amber transition-colors"
          style={{ color: current.color || '#f59e0b' }}
        >
          {current.text}
        </span>
        {current.tag && (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
            {current.tag}
          </span>
        )}
      </div>
    </div>
  );
};
