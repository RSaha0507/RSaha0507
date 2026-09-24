import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface RocketEvent {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  angle: number;
  duration: number;
  scale: number;
  color: string;
}

export const CosmicFloatingEntities: React.FC = () => {
  const [rockets, setRockets] = useState<RocketEvent[]>([]);
  const [telemetryActive, setTelemetryActive] = useState(false);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: number; left: number; angle: number; speed: number }[]>([]);

  // Function to spawn a dynamic passing rocket
  const spawnRocket = (customTrajectory?: Partial<RocketEvent>) => {
    const id = Date.now() + Math.random();
    // Randomize trajectory directions
    const trajectories = [
      { startX: -15, startY: 75, endX: 115, endY: 15, angle: -30, color: '#f59e0b' },
      { startX: -15, startY: 85, endX: 115, endY: 25, angle: -28, color: '#38bdf8' },
      { startX: 115, startY: 80, endX: -15, endY: 10, angle: -155, color: '#fbbf24' },
      { startX: -10, startY: 40, endX: 110, endY: 60, angle: 12, color: '#ec4899' },
    ];
    const base = trajectories[Math.floor(Math.random() * trajectories.length)];
    const newRocket: RocketEvent = {
      id,
      startX: customTrajectory?.startX ?? base.startX,
      startY: customTrajectory?.startY ?? base.startY,
      endX: customTrajectory?.endX ?? base.endX,
      endY: customTrajectory?.endY ?? base.endY,
      angle: customTrajectory?.angle ?? base.angle,
      duration: Math.random() * 2.5 + 4.5, // 4.5s to 7.0s
      scale: Math.random() * 0.3 + 0.85,
      color: customTrajectory?.color ?? base.color,
    };

    setRockets((prev) => [...prev.slice(-3), newRocket]);

    setTimeout(() => {
      setRockets((prev) => prev.filter((r) => r.id !== id));
    }, (newRocket.duration + 1) * 1000);
  };

  // Periodic rocket flybys every 20-35 seconds
  useEffect(() => {
    // Initial rocket after 3.5 seconds
    const initialTimer = setTimeout(() => {
      spawnRocket();
    }, 3500);

    const interval = setInterval(() => {
      spawnRocket();
    }, 24000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Periodic shooting stars
  useEffect(() => {
    const starInterval = setInterval(() => {
      const star = {
        id: Date.now() + Math.random(),
        top: Math.random() * 60,
        left: Math.random() * 70,
        angle: 35 + Math.random() * 20,
        speed: 1.2 + Math.random() * 1.5,
      };
      setShootingStars((prev) => [...prev.slice(-2), star]);

      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
      }, 2500);
    }, 9000);

    return () => clearInterval(starInterval);
  }, []);

  return (
    <>
      {/* Background Floating Cosmic Layer - Strictly in background behind main content */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* ========================================================= */}
        {/* 1. Orbiting Satellite 1 (Deep Space Orbiter with Solar Panels) */}
        {/* ========================================================= */}
        <motion.div
          className="absolute pointer-events-none"
          initial={{ x: '10vw', y: '18vh', rotate: 0 }}
          animate={{
            x: ['8vw', '24vw', '38vw', '22vw', '8vw'],
            y: ['16vh', '28vh', '22vh', '12vh', '16vh'],
            rotate: [0, 12, -8, 6, 0],
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(56,189,248,0.3)] opacity-70">
            {/* Signal Transmission Waves on Active Telemetry */}
            {telemetryActive && (
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-12 h-12 rounded-full border border-sky-400 bg-sky-400/10 pointer-events-none"
              />
            )}

            {/* Satellite SVG Artwork */}
            <svg width="58" height="58" viewBox="0 0 64 64" fill="none" className="overflow-visible">
              {/* Left Solar Array */}
              <rect x="2" y="24" width="18" height="16" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
              <line x1="8" y1="24" x2="8" y2="40" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="14" y1="24" x2="14" y2="40" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="2" y1="32" x2="20" y2="32" stroke="#7dd3fc" strokeWidth="0.8" />
              {/* Connector Left */}
              <line x1="20" y1="32" x2="25" y2="32" stroke="#94a3b8" strokeWidth="2" />

              {/* Central Satellite Chassis */}
              <rect x="25" y="22" width="14" height="20" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="32" cy="30" r="3" fill="#f59e0b" className="animate-pulse" />
              
              {/* Blinking LED Diode */}
              <circle cx="32" cy="38" r="1.5" fill="#10b981">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Parabolic Dish Antenna */}
              <path d="M 32 22 L 32 12 M 25 12 Q 32 6 39 12" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
              <circle cx="32" cy="9" r="1.2" fill="#38bdf8" />

              {/* Connector Right */}
              <line x1="39" y1="32" x2="44" y2="32" stroke="#94a3b8" strokeWidth="2" />
              {/* Right Solar Array */}
              <rect x="44" y="24" width="18" height="16" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
              <line x1="50" y1="24" x2="50" y2="40" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="56" y1="24" x2="56" y2="40" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="44" y1="32" x2="62" y2="32" stroke="#7dd3fc" strokeWidth="0.8" />
            </svg>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. Orbiting Satellite 2 (High-Altitude Sensor Drone) */}
        {/* ========================================================= */}
        <motion.div
          className="absolute hidden md:block pointer-events-none"
          initial={{ x: '85vw', y: '65vh' }}
          animate={{
            x: ['85vw', '72vw', '80vw', '92vw', '85vw'],
            y: ['65vh', '52vh', '42vh', '58vh', '65vh'],
            rotate: [0, -15, 10, -5, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative opacity-50 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="3" fill="#f59e0b" />
              <line x1="20" y1="6" x2="20" y2="1" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="20" cy="1" r="1.5" fill="#38bdf8" />
              <line x1="32" y1="27" x2="38" y2="31" stroke="#38bdf8" strokeWidth="1" />
              <line x1="8" y1="27" x2="2" y2="31" stroke="#38bdf8" strokeWidth="1" />
            </svg>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. Orbiting Stellar Ring & Celestial Orbit Stars */}
        {/* ========================================================= */}
        <div className="absolute top-[28%] right-[8%] w-44 h-44 pointer-events-none hidden lg:block opacity-60">
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-500/15 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b] animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-4 rounded-full border border-sky-400/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#10b981]" />
            </div>
          </motion.div>
        </div>

        {/* Orbiting Star Field on Left Side */}
        <div className="absolute bottom-[35%] left-[5%] w-36 h-36 pointer-events-none hidden md:block opacity-50">
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_8px_#818cf8]" />
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 4. Passing Rockets in Background Layer */}
        {/* ========================================================= */}
        <AnimatePresence>
          {rockets.map((r) => (
            <motion.div
              key={r.id}
              initial={{
                left: `${r.startX}vw`,
                top: `${r.startY}vh`,
                rotate: r.angle,
                scale: r.scale * 0.7,
                opacity: 0,
              }}
              animate={{
                left: `${r.endX}vw`,
                top: `${r.endY}vh`,
                rotate: r.angle,
                scale: r.scale,
                opacity: [0, 0.85, 0.85, 0.75, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: r.duration,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="absolute pointer-events-none"
            >
              <div className="relative flex items-center filter drop-shadow-[0_0_14px_rgba(245,158,11,0.6)] opacity-85">
                {/* Rocket Body SVG */}
                <svg width="64" height="30" viewBox="0 0 70 34" fill="none" className="overflow-visible">
                  <g className="animate-pulse">
                    <path
                      d="M 12 17 L -18 10 Q -42 17 -18 24 Z"
                      fill="url(#exhaust-gradient)"
                      opacity="0.85"
                    />
                    <path
                      d="M 12 17 L -8 13 Q -24 17 -8 21 Z"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    <line x1="-15" y1="17" x2="-65" y2="17" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="3" strokeDasharray="6 8" />
                    <line x1="-10" y1="12" x2="-55" y2="8" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 6" />
                    <line x1="-10" y1="22" x2="-55" y2="26" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 6" />
                  </g>

                  <path d="M 18 10 L 8 2 L 16 11 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 18 24 L 8 32 L 16 23 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />

                  <path
                    d="M 14 11 L 42 11 Q 62 17 42 23 L 14 23 Z"
                    fill="#0f172a"
                    stroke={r.color}
                    strokeWidth="1.8"
                  />

                  <circle cx="44" cy="17" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
                  <circle cx="43" cy="15.5" r="1" fill="#ffffff" />
                  <path d="M 50 14.5 Q 64 17 50 19.5 Z" fill={r.color} />
                  <rect x="10" y="12" width="4" height="10" rx="1" fill="#475569" stroke="#94a3b8" strokeWidth="1" />

                  <defs>
                    <linearGradient id="exhaust-gradient" x1="12" y1="17" x2="-45" y2="17" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="20%" stopColor="#fbbf24" />
                      <stop offset="60%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* 5. Shooting Meteor Star Streaks */}
        {/* ========================================================= */}
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              top: `${star.top + 25}vh`,
              left: `${star.left + 35}vw`,
              opacity: [0, 0.8, 0.7, 0],
              scale: [0.2, 1, 0.8, 0],
            }}
            transition={{
              duration: star.speed,
              ease: 'easeOut',
            }}
            className="absolute pointer-events-none"
          >
            <div
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-white shadow-[0_0_10px_#fbbf24]"
              style={{ transform: `rotate(${star.angle}deg)` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Interactive Space Radar Rocket Launcher Trigger (Bottom Corner, elevated above content) */}
      <div className="fixed bottom-5 left-5 z-30 pointer-events-auto">
        <button
          onClick={() => {
            setTelemetryActive(true);
            spawnRocket();
            setTimeout(() => setTelemetryActive(false), 3000);
          }}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900/95 border border-slate-800 hover:border-amber-500/50 backdrop-blur-md text-slate-400 hover:text-amber-400 text-xs font-mono transition-all duration-300 shadow-xl shadow-black/60 cursor-pointer"
          title="Launch passing flyby rocket through the background"
        >
          <Rocket className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline text-[11px]">Launch Rocket</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>
    </>
  );
};
