import React, { useState } from 'react';

interface SpiralTextProps {
  text?: string;
  radius?: number;
  speed?: number;
  className?: string;
  interactive?: boolean;
}

export const SpiralText: React.FC<SpiralTextProps> = ({
  text = '• MACHINE LEARNING • FULL STACK • TRANSFORMERS • EDGE AI • NIT MEGHALAYA • 9.39 CGPA • SURAJ FELLOW •',
  radius = 90,
  speed = 18,
  className = '',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(speed);

  return (
    <div
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (interactive) setRotationSpeed(speed * 0.4); // accelerates or slows smoothly
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (interactive) setRotationSpeed(speed);
      }}
      title="Interactive 3D Spiral Kinetic Badge - Hover or drag"
    >
      {/* Center Core Emblem */}
      <div className="absolute z-10 w-16 h-16 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
        <span className="text-amber-400 text-xs font-black font-mono tracking-tighter text-glow-amber">
          RS
        </span>
        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
          '26
        </span>
      </div>

      {/* Outer Rotating Spiral Ribbon */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          animation: `spin-clockwise ${rotationSpeed}s linear infinite`,
        }}
      >
        <svg
          viewBox="0 0 260 260"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Spiral Circular Path */}
            <path
              id="spiral-path"
              d="M 130, 130 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0"
            />
            <path
              id="spiral-path-inner"
              d="M 130, 130 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
            />
          </defs>

          {/* Glowing Ambient Spiral Rings */}
          <circle
            cx="130"
            cy="130"
            r="95"
            fill="none"
            stroke="rgba(245, 158, 11, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="animate-pulse"
          />
          <circle
            cx="130"
            cy="130"
            r="70"
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="1"
          />

          {/* Primary Outer Spiral Text Track */}
          <text className="text-[9.5px] font-bold font-mono tracking-[0.22em] fill-amber-400">
            <textPath
              href="#spiral-path"
              startOffset="0%"
              style={{
                textShadow: isHovered
                  ? '0 0 12px rgba(245, 158, 11, 0.9)'
                  : '0 0 6px rgba(245, 158, 11, 0.5)',
              }}
            >
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Secondary Counter-Rotating Inner Spiral Particle Ring */}
      <div
        className="absolute inset-4 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
        style={{
          animation: `spin-counter-clockwise ${rotationSpeed * 1.4}s linear infinite`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <text className="text-[7.5px] font-bold font-mono tracking-[0.18em] fill-sky-400">
            <textPath href="#spiral-path-inner" startOffset="0%">
              NIT MEGHALAYA &bull; SURAJ FELLOW IIT JODHPUR &bull; 9.39 CGPA &bull;
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};
