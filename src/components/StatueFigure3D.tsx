import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Eye, Zap, Layers, RefreshCw, Shield, Flame } from 'lucide-react';

export type StatueEffectMode = 'cyber-gold' | 'hologram' | 'quantum-amber' | 'cosmic-void';

interface StatueFigure3DProps {
  initialImage?: string;
  className?: string;
  compact?: boolean;
}

export const StatueFigure3D: React.FC<StatueFigure3DProps> = ({
  initialImage = '/statue_figure_3d.png',
  className = '',
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [currentImage, setCurrentImage] = useState<string>(initialImage);
  const [activeMode, setActiveMode] = useState<StatueEffectMode>('cyber-gold');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [burstKey, setBurstKey] = useState<number>(0);

  // Tilt physics values
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
  });

  // Three.js Scene refs for background 3D particle vortex & holographic rings
  const threeSceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    ringMesh: THREE.Mesh;
    pedestalRings: THREE.Group;
    animationFrameId: number;
  } | null>(null);

  // Mode styling configurations
  const modeConfigs: Record<
    StatueEffectMode,
    {
      name: string;
      icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
      accentColor: string;
      glowClass: string;
      borderColor: string;
      ringColor: number;
      lightColor: string;
      scanColor: string;
      specularStyle: string;
    }
  > = {
    'cyber-gold': {
      name: 'Cyber Gold & Bronze',
      icon: Shield,
      accentColor: '#f59e0b',
      glowClass: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderColor: 'border-amber-500/40',
      ringColor: 0xf59e0b,
      lightColor: 'rgba(245, 158, 11, 0.45)',
      scanColor: 'rgba(245, 158, 11, 0.85)',
      specularStyle: 'linear-gradient(135deg, rgba(254, 240, 138, 0.35) 0%, transparent 60%)',
    },
    'hologram': {
      name: 'Holographic Matrix',
      icon: Layers,
      accentColor: '#38bdf8',
      glowClass: 'from-sky-500/25 via-cyan-500/15 to-transparent',
      borderColor: 'border-sky-400/40',
      ringColor: 0x38bdf8,
      lightColor: 'rgba(56, 189, 248, 0.5)',
      scanColor: 'rgba(56, 189, 248, 0.95)',
      specularStyle: 'linear-gradient(135deg, rgba(186, 230, 253, 0.4) 0%, transparent 60%)',
    },
    'quantum-amber': {
      name: 'Quantum Core',
      icon: Zap,
      accentColor: '#fb923c',
      glowClass: 'from-orange-500/25 via-amber-500/15 to-transparent',
      borderColor: 'border-orange-500/40',
      ringColor: 0xfb923c,
      lightColor: 'rgba(251, 146, 60, 0.55)',
      scanColor: 'rgba(251, 146, 60, 0.9)',
      specularStyle: 'linear-gradient(135deg, rgba(253, 186, 116, 0.35) 0%, transparent 60%)',
    },
    'cosmic-void': {
      name: 'Cosmic Singularity',
      icon: Flame,
      accentColor: '#c084fc',
      glowClass: 'from-purple-500/25 via-fuchsia-500/15 to-transparent',
      borderColor: 'border-purple-500/40',
      ringColor: 0xa855f7,
      lightColor: 'rgba(192, 132, 252, 0.5)',
      scanColor: 'rgba(192, 132, 252, 0.9)',
      specularStyle: 'linear-gradient(135deg, rgba(233, 213, 255, 0.35) 0%, transparent 60%)',
    },
  };

  const currentConfig = modeConfigs[activeMode];

  // Initialize WebGL Three.js Particle & Energy Ring Field
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle field around statue figure
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 8.5;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      scales[i] = Math.random() * 1.5 + 0.5;
      speeds[i] = Math.random() * 0.02 + 0.005;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: currentConfig.ringColor,
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 3D Pedestal Interactive Sci-Fi Ring Group
    const pedestalRings = new THREE.Group();
    pedestalRings.position.y = -6.5;

    // Base Ring 1
    const ringGeo1 = new THREE.TorusGeometry(5.8, 0.05, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: currentConfig.ringColor,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    pedestalRings.add(ringMesh1);

    // Base Ring 2 (Inner Rune Grid)
    const ringGeo2 = new THREE.TorusGeometry(4.2, 0.04, 16, 48);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat1.clone());
    ringMesh2.rotation.x = Math.PI / 2;
    pedestalRings.add(ringMesh2);

    // Orbiting Floating Energy Halo
    const haloGeo = new THREE.TorusGeometry(3.6, 0.03, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: currentConfig.ringColor,
      transparent: true,
      opacity: 0.5,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.y = 8.5;
    haloMesh.rotation.x = Math.PI / 2.3;
    pedestalRings.add(haloMesh);

    scene.add(pedestalRings);

    threeSceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      ringMesh: ringMesh1,
      pedestalRings,
      animationFrameId: 0,
    };

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle vortex
      if (particles) {
        particles.rotation.y = elapsedTime * 0.12;
        const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          array[i * 3 + 1] += speeds[i];
          if (array[i * 3 + 1] > 9) {
            array[i * 3 + 1] = -8.5;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Rotate pedestal rings
      if (pedestalRings) {
        pedestalRings.rotation.y = -elapsedTime * 0.25;
        ringMesh1.rotation.z = elapsedTime * 0.15;
        haloMesh.rotation.z = -elapsedTime * 0.35;
        haloMesh.position.y = 8.5 + Math.sin(elapsedTime * 2) * 0.35;
      }

      renderer.render(scene, camera);
      threeSceneRef.current!.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !threeSceneRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeSceneRef.current) {
        cancelAnimationFrame(threeSceneRef.current.animationFrameId);
        renderer.dispose();
      }
    };
  }, []);

  // Update Three.js materials when activeMode changes
  useEffect(() => {
    if (!threeSceneRef.current) return;
    const { particles, ringMesh, pedestalRings } = threeSceneRef.current;
    if (particles && particles.material instanceof THREE.PointsMaterial) {
      particles.material.color.setHex(currentConfig.ringColor);
    }
    if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
      ringMesh.material.color.setHex(currentConfig.ringColor);
    }
    pedestalRings.children.forEach((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.color.setHex(currentConfig.ringColor);
      }
    });
  }, [activeMode, currentConfig]);

  // Handle Mouse Tilt & Dynamic Point Light tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isDragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Range: -16 to +16 degrees for smooth 3D depth tilt
      const rotY = (x - 0.5) * 28;
      const rotX = -(y - 0.5) * 22;

      setRotation({ x: rotX, y: rotY });
      setLightPos({ x: x * 100, y: y * 100 });
    },
    [isDragging]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      setRotation({ x: 0, y: 0 });
      setLightPos({ x: 50, y: 50 });
    }
  };

  // Drag to rotate 3D interactive gesture
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      setRotation({
        x: Math.max(-35, Math.min(35, dragStartRef.current.rotX - deltaY * 0.35)),
        y: Math.max(-45, Math.min(45, dragStartRef.current.rotY + deltaX * 0.45)),
      });
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Click burst shockwave
  const triggerStatueBurst = () => {
    setBurstKey((prev: number) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none flex flex-col items-center justify-center perspective-[1200px] ${className}`}
      style={{ minHeight: compact ? '400px' : '500px' }}
    >
      {/* Background Three.js Particle & Energy Ring Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
      />

      {/* Dynamic Ambient Backlight Glow */}
      <div
        className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr ${currentConfig.glowClass} blur-3xl transition-all duration-700 pointer-events-none -z-10`}
        style={{
          transform: `translate3d(${(lightPos.x - 50) * 0.6}px, ${(lightPos.y - 50) * 0.6}px, -100px)`,
        }}
      />

      {/* 3D Monument Statue Card Wrapper */}
      <div
        onMouseDown={handleMouseDown}
        onClick={triggerStatueBurst}
        className="relative z-10 cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out flex flex-col items-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${isHovered ? '25px' : '0px'})`,
        }}
      >
        {/* 3D Statue Figure Frame with Dynamic Specular Reflection */}
        <div
          className={`relative rounded-3xl overflow-hidden p-2 sm:p-2.5 bg-slate-950/80 backdrop-blur-xl border ${currentConfig.borderColor} shadow-2xl transition-colors duration-500`}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: `0 20px 50px -10px ${currentConfig.lightColor}, 0 0 30px -5px ${currentConfig.lightColor}`,
            width: compact ? '280px' : '330px',
            height: compact ? '350px' : '415px',
          }}
        >
          {/* Holographic Laser Scanner Beam */}
          {isScanning && (
            <div
              className="absolute inset-x-0 h-1.5 z-30 pointer-events-none animate-scanline shadow-lg"
              style={{
                backgroundColor: currentConfig.accentColor,
                boxShadow: `0 0 15px 4px ${currentConfig.scanColor}, 0 0 30px 8px ${currentConfig.scanColor}`,
              }}
            />
          )}

          {/* Interactive Dynamic Specular Lighting Angle Layer */}
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle 240px at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.2), transparent 75%)`,
              opacity: isHovered ? 0.9 : 0.4,
            }}
          />

          {/* Matrix Glitch Grid Overlay */}
          {activeMode === 'hologram' && (
            <div className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:16px_16px]" />
          )}

          {/* Main 3D Statue Image (Optimized resolution & complete fitting) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 flex items-center justify-center p-1">
            <img
              src={currentImage}
              alt="3D Statue Figure"
              className={`w-full h-full object-contain object-center transition-all duration-500 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] ${
                activeMode === 'cyber-gold'
                  ? 'brightness-110 contrast-115'
                  : activeMode === 'hologram'
                  ? 'hue-rotate-180 brightness-110 contrast-125 saturate-150'
                  : activeMode === 'quantum-amber'
                  ? 'saturate-140 brightness-105'
                  : 'hue-rotate-90 saturate-125 brightness-105'
              }`}
              onError={() => {
                if (currentImage !== '/myphoto.jpg') {
                  setCurrentImage('/myphoto.jpg');
                }
              }}
            />

            {/* Subtle floating 3D depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Pedestal energy flare */}
            <div
              className="absolute bottom-0 inset-x-0 h-14 pointer-events-none opacity-80 blur-md transition-colors duration-500"
              style={{
                background: `radial-gradient(ellipse at bottom, ${currentConfig.accentColor}, transparent 70%)`,
              }}
            />
          </div>

          {/* Corner Cyber Accents */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-amber-400/80 z-20" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-amber-400/80 z-20" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 z-20" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-amber-400/80 z-20" />
        </div>

        {/* 3D Sci-Fi Base Pedestal Platform */}
        <div
          className="relative -mt-4 z-20 flex flex-col items-center"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Upper Pedestal Ring */}
          <div
            className="w-48 sm:w-56 h-3 rounded-full bg-slate-900 border border-slate-700/80 shadow-lg flex items-center justify-center transition-all duration-300"
            style={{
              boxShadow: `0 0 20px ${currentConfig.lightColor}`,
              borderColor: currentConfig.accentColor,
            }}
          >
            <div
              className="w-24 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: currentConfig.accentColor }}
            />
          </div>

          {/* Lower Pedestal Plinth with Dynamic Status Tag */}
          <div className="mt-1 px-4 py-1 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] text-slate-300 font-mono flex items-center gap-2 shadow-xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentConfig.accentColor }} />
            <span>CLICK TO PULSE</span>
          </div>
        </div>

        {/* Click Shockwave Pulse Animation Effect */}
        {burstKey > 0 && (
          <div
            key={burstKey}
            className="absolute inset-0 rounded-3xl pointer-events-none animate-ping z-30 border-2"
            style={{ borderColor: currentConfig.accentColor }}
          />
        )}
      </div>

      {/* Interactive 3D Customizer Bar */}
      <div className="relative z-20 mt-4 flex items-center justify-center gap-2 max-w-sm px-2">
        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 shadow-lg">
          {(Object.keys(modeConfigs) as StatueEffectMode[]).map((modeKey) => {
            const mode = modeConfigs[modeKey];
            const Icon = mode.icon;
            const isSelected = activeMode === modeKey;
            return (
              <button
                key={modeKey}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setActiveMode(modeKey);
                }}
                title={mode.name}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-md border'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                style={{
                  borderColor: isSelected ? mode.accentColor : 'transparent',
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: mode.accentColor }} />
              </button>
            );
          })}
        </div>

        {/* Scanner Laser Toggle */}
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setIsScanning(!isScanning);
          }}
          title="Toggle Hologram Scanline"
          className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all duration-200 flex items-center gap-1 ${
            isScanning
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Scan</span>
        </button>

        {/* Reset View Button */}
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setRotation({ x: 0, y: 0 });
            setLightPos({ x: 50, y: 50 });
          }}
          title="Reset 3D Angle"
          className="p-2 rounded-xl text-xs font-semibold backdrop-blur-md bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
