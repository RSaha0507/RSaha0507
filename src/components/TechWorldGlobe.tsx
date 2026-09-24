import React, { useEffect, useRef, useState } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  MapPin,
  ChevronRight,
  Sparkles,
  Globe2,
  X
} from 'lucide-react';
import { getTechItem } from './TechIcons';
import { projectList } from '../data/portfolioData';

export interface TechCountry {
  id: string;
  name: string;
  codename: string;
  flagEmoji: string;
  color: string;
  secondaryColor: string;
  accentRgb: string;
  centerLat: number;
  centerLon: number;
  description: string;
  specialty: string;
  skills: {
    name: string;
    proficiency: number;
    usage: number;
    role: string;
  }[];
  relatedProjects: string[];
}

export const techCountries: TechCountry[] = [
  {
    id: 'ai-ml-republic',
    name: 'Neural & Deep Learning Republic',
    codename: 'ML-CORE-01',
    flagEmoji: '🧠',
    color: '#a855f7',
    secondaryColor: '#ec4899',
    accentRgb: '168, 85, 247',
    centerLat: 38,
    centerLon: -95,
    description: 'High-performance neural network architectures, attention compression, model pruning, and edge quantization research.',
    specialty: 'Transformer Optimization & Edge Deployment',
    skills: [
      { name: 'PyTorch', proficiency: 90, usage: 85, role: 'Primary Research Framework' },
      { name: 'TensorFlow & Keras', proficiency: 90, usage: 85, role: 'Deep Learning & Pipelines' },
      { name: 'Scikit-learn', proficiency: 95, usage: 80, role: 'Classical Machine Learning' },
      { name: 'Transformers', proficiency: 92, usage: 90, role: 'Attention Mechanisms & NLP' },
      { name: 'Quantization', proficiency: 88, usage: 80, role: 'PTQ & QAT INT8/INT4' },
      { name: 'Model Pruning', proficiency: 85, usage: 75, role: 'Structured Head Pruning' },
    ],
    relatedProjects: ['Lightweight Transformer Model', 'Cyber Threat Intelligence System', 'Nirmaya Health Services']
  },
  {
    id: 'data-language-realm',
    name: 'Data & Languages Archipelago',
    codename: 'LANG-DATA-02',
    flagEmoji: '🐍',
    color: '#10b981',
    secondaryColor: '#06b6d4',
    accentRgb: '16, 185, 129',
    centerLat: 22,
    centerLon: 80,
    description: 'Algorithmic computing, low-level efficiency, relational query modeling, and document persistence pipelines.',
    specialty: 'High-Throughput Algorithms & Persistence',
    skills: [
      { name: 'Python', proficiency: 95, usage: 90, role: 'Core Engineering Language' },
      { name: 'C/C++', proficiency: 85, usage: 60, role: 'Low-level Algorithms & CS' },
      { name: 'JavaScript', proficiency: 80, usage: 75, role: 'Web Scripting & Async' },
      { name: 'Java', proficiency: 70, usage: 40, role: 'Object Oriented Systems' },
      { name: 'SQL (MySQL)', proficiency: 80, usage: 50, role: 'Relational Schema & Queries' },
      { name: 'NoSQL (MongoDB, Firebase)', proficiency: 85, usage: 70, role: 'Document & Real-time Sync' },
    ],
    relatedProjects: ['Cyber Threat Intelligence System', 'Nirmaya Health Services']
  },
  {
    id: 'web-frontend-empire',
    name: 'Reactive Web & Interface Union',
    codename: 'WEB-UI-03',
    flagEmoji: '⚛️',
    color: '#f59e0b',
    secondaryColor: '#f97316',
    accentRgb: '245, 158, 11',
    centerLat: 50,
    centerLon: 15,
    description: 'Modern, highly responsive user experiences with fluid animations, state synchronization, and micro-interactions.',
    specialty: 'Full-Stack SPA & Responsive Design',
    skills: [
      { name: 'React.js', proficiency: 80, usage: 60, role: 'SPA & Component Architectures' },
      { name: 'Tailwind CSS', proficiency: 90, usage: 75, role: 'Design Systems & Utility Styling' },
      { name: 'Flask', proficiency: 85, usage: 50, role: 'Microservice API Gateways' },
    ],
    relatedProjects: ['Nirmaya Health Services']
  },
  {
    id: 'devops-tooling-haven',
    name: 'DevOps & Tooling Sanctuary',
    codename: 'OPS-ENV-04',
    flagEmoji: '🚀',
    color: '#ef4444',
    secondaryColor: '#f43f5e',
    accentRgb: '239, 68, 68',
    centerLat: -25,
    centerLon: 135,
    description: 'Version control, developer ergonomics, automated deployment pipelines, and live data dashboarding.',
    specialty: 'Rapid Deployment & Prototyping',
    skills: [
      { name: 'Git & GitHub', proficiency: 95, usage: 100, role: 'VCS & Collaboration' },
      { name: 'Vercel & Netlify', proficiency: 90, usage: 80, role: 'Edge & CI/CD Deployment' },
      { name: 'Jupyter Notebooks', proficiency: 95, usage: 90, role: 'Research & Model Benchmarks' },
      { name: 'VSCode', proficiency: 95, usage: 100, role: 'IDE & Debugger Tooling' },
      { name: 'Streamlit', proficiency: 80, usage: 40, role: 'Rapid ML Dashboards' },
    ],
    relatedProjects: ['Cyber Threat Intelligence System', 'Lightweight Transformer Model']
  }
];

interface GlobeState {
  rotX: number;
  rotY: number;
  targetRotX: number;
  targetRotY: number;
  velX: number;
  velY: number;
  isDragging: boolean;
  lastMouseX: number;
  lastMouseY: number;
  zoom: number;
  targetZoom: number;
  hoveredCountryId: string | null;
  focusedCountryId: string | null;
}

export const TechWorldGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<TechCountry | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<TechCountry | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects'>('overview');

  // Animation and interaction state stored in refs to prevent render lag
  const stateRef = useRef<GlobeState>({
    rotX: 0.25,
    rotY: 0.8,
    targetRotX: 0.25,
    targetRotY: 0.8,
    velX: 0,
    velY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    zoom: 1,
    targetZoom: 1,
    hoveredCountryId: null,
    focusedCountryId: null,
  });

  // Convert lat/lon to 3D sphere coordinate
  const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
  };

  // Fly to country
  const focusCountry = (country: TechCountry) => {
    setSelectedCountry(country);
    stateRef.current.focusedCountryId = country.id;
    // Calculate target rotation to bring country to front center
    const targetY = -(country.centerLon * Math.PI) / 180 - Math.PI / 2;
    const targetX = (country.centerLat * Math.PI) / 180;
    stateRef.current.targetRotY = targetY;
    stateRef.current.targetRotX = Math.max(-0.8, Math.min(0.8, targetX));
    stateRef.current.targetZoom = 1.15;
  };

  const resetView = () => {
    setSelectedCountry(null);
    stateRef.current.focusedCountryId = null;
    stateRef.current.targetRotX = 0.25;
    stateRef.current.targetRotY = 0.8;
    stateRef.current.targetZoom = 1;
    setIsAutoRotating(true);
  };

  const adjustZoom = (delta: number) => {
    const nextZoom = Math.min(1.4, Math.max(0.7, stateRef.current.targetZoom + delta));
    stateRef.current.targetZoom = nextZoom;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = Math.max(380, rect.height || 420) * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${Math.max(380, rect.height || 420)}px`;
      ctx.scale(dpr, dpr);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Generate globe surface particles and country continent land clusters
    const globeRadius = 140;

    interface GlobePoint {
      lat: number;
      lon: number;
      countryId?: string;
      color?: string;
      size: number;
      isCountryHub?: boolean;
      label?: string;
    }

    const points: GlobePoint[] = [];

    // 1. Base oceanic and continental graticule dots
    for (let lat = -80; lat <= 80; lat += 12) {
      const circumference = Math.cos((lat * Math.PI) / 180);
      const count = Math.max(8, Math.floor(36 * circumference));
      for (let i = 0; i < count; i++) {
        const lon = -180 + (360 / count) * i;
        points.push({
          lat,
          lon,
          size: 1.2,
          color: 'rgba(51, 65, 85, 0.45)',
        });
      }
    }

    // 2. Generate densely populated country terrain clusters around country centers
    techCountries.forEach((country) => {
      // Country center hub
      points.push({
        lat: country.centerLat,
        lon: country.centerLon,
        countryId: country.id,
        color: country.color,
        size: 5,
        isCountryHub: true,
        label: country.name,
      });

      // Satellite tech skill nodes in this country
      country.skills.forEach((skill, sIdx) => {
        const angle = (sIdx / country.skills.length) * Math.PI * 2;
        const dist = 14 + (sIdx % 3) * 5;
        const sLat = country.centerLat + Math.sin(angle) * dist;
        const sLon = country.centerLon + Math.cos(angle) * (dist * 1.3);

        points.push({
          lat: sLat,
          lon: sLon,
          countryId: country.id,
          color: country.secondaryColor,
          size: 3.2,
          label: skill.name,
        });

        // Add smaller terrain particles connecting the node
        for (let p = 0; p < 4; p++) {
          const jitterLat = sLat + (Math.random() - 0.5) * 6;
          const jitterLon = sLon + (Math.random() - 0.5) * 8;
          points.push({
            lat: jitterLat,
            lon: jitterLon,
            countryId: country.id,
            color: country.color,
            size: 1.6,
          });
        }
      });
    });

    // Interaction Handlers
    let isMouseDown = false;
    let clickStartX = 0;
    let clickStartY = 0;

    const handlePointerDown = (clientX: number, clientY: number) => {
      isMouseDown = true;
      stateRef.current.isDragging = true;
      stateRef.current.lastMouseX = clientX;
      stateRef.current.lastMouseY = clientY;
      clickStartX = clientX;
      clickStartY = clientY;
      setIsAutoRotating(false);
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      if (isMouseDown) {
        const dx = clientX - stateRef.current.lastMouseX;
        const dy = clientY - stateRef.current.lastMouseY;
        stateRef.current.rotY += dx * 0.007;
        stateRef.current.rotX = Math.max(-1.1, Math.min(1.1, stateRef.current.rotX + dy * 0.007));
        stateRef.current.targetRotY = stateRef.current.rotY;
        stateRef.current.targetRotX = stateRef.current.rotX;
        stateRef.current.lastMouseX = clientX;
        stateRef.current.lastMouseY = clientY;
      }

      // Check hover on Country Hubs
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = globeRadius * stateRef.current.zoom;

      let foundHover: TechCountry | null = null;

      techCountries.forEach((country) => {
        const v = latLonToVector3(country.centerLat, country.centerLon, r);
        // Apply current rotation
        const cosY = Math.cos(stateRef.current.rotY);
        const sinY = Math.sin(stateRef.current.rotY);
        const cosX = Math.cos(stateRef.current.rotX);
        const sinX = Math.sin(stateRef.current.rotX);

        // Y-axis rotation
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.z * cosY + v.x * sinY;
        // X-axis rotation
        const y1 = v.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + v.y * sinX;

        // If on front side of sphere
        if (z2 > 0) {
          const screenX = cx + x1;
          const screenY = cy + y1;
          const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
          if (dist < 32) {
            foundHover = country;
          }
        }
      });

      setHoveredCountry(foundHover);
      stateRef.current.hoveredCountryId = foundHover ? (foundHover as TechCountry).id : null;
      canvas.style.cursor = isMouseDown ? 'grabbing' : foundHover ? 'pointer' : 'grab';
    };

    const handlePointerUp = (clientX: number, clientY: number) => {
      isMouseDown = false;
      stateRef.current.isDragging = false;

      // Check if it was a click (not a long drag)
      const dragDistance = Math.hypot(clientX - clickStartX, clientY - clickStartY);
      if (dragDistance < 6) {
        const targetId = stateRef.current.hoveredCountryId;
        if (targetId) {
          const country = techCountries.find((c) => c.id === targetId);
          if (country) {
            focusCountry(country);
          }
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = (e: MouseEvent) => handlePointerUp(e.clientX, e.clientY);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1) {
        handlePointerUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Main Render Loop
    let time = 0;

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for rotation & zoom
      if (isAutoRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotY += 0.003;
      }

      stateRef.current.rotY += (stateRef.current.targetRotY - stateRef.current.rotY) * 0.08;
      stateRef.current.rotX += (stateRef.current.targetRotX - stateRef.current.rotX) * 0.08;
      stateRef.current.zoom += (stateRef.current.targetZoom - stateRef.current.zoom) * 0.1;

      const currentRadius = globeRadius * stateRef.current.zoom;

      const cosY = Math.cos(stateRef.current.rotY);
      const sinY = Math.sin(stateRef.current.rotY);
      const cosX = Math.cos(stateRef.current.rotX);
      const sinX = Math.sin(stateRef.current.rotX);

      // 1. Draw Globe Outer Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        currentRadius * 0.7,
        cx,
        cy,
        currentRadius * 1.35
      );
      glowGrad.addColorStop(0, 'rgba(15, 23, 42, 0.25)');
      glowGrad.addColorStop(0.7, 'rgba(30, 41, 59, 0.15)');
      glowGrad.addColorStop(0.9, 'rgba(56, 189, 248, 0.12)');
      glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Translucent Sphere Background Disc (allows background 3D animation to shine through)
      const sphereBg = ctx.createRadialGradient(
        cx - currentRadius * 0.3,
        cy - currentRadius * 0.3,
        currentRadius * 0.1,
        cx,
        cy,
        currentRadius
      );
      sphereBg.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      sphereBg.addColorStop(0.8, 'rgba(2, 6, 23, 0.45)');
      sphereBg.addColorStop(1, 'rgba(30, 41, 59, 0.3)');

      ctx.fillStyle = sphereBg;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sphere border ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Draw Latitude & Longitude Neon Rings
      ctx.lineWidth = 1;
      const latitudeAngles = [-60, -30, 0, 30, 60];
      latitudeAngles.forEach((lat) => {
        ctx.beginPath();
        const rLat = currentRadius * Math.cos((lat * Math.PI) / 180);
        const yLat = -currentRadius * Math.sin((lat * Math.PI) / 180);
        const steps = 40;
        let isFirst = true;

        for (let i = 0; i <= steps; i++) {
          const lon = (i / steps) * 360 - 180;
          const rad = (lon * Math.PI) / 180;
          const px = rLat * Math.sin(rad);
          const pz = rLat * Math.cos(rad);

          // Rotate
          const x1 = px * cosY - pz * sinY;
          const z1 = pz * cosY + px * sinY;
          const y1 = yLat * cosX - z1 * sinX;
          const z2 = z1 * cosX + yLat * sinX;

          if (z2 > -currentRadius * 0.2) {
            const screenX = cx + x1;
            const screenY = cy + y1;
            if (isFirst) {
              ctx.moveTo(screenX, screenY);
              isFirst = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            isFirst = true;
          }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(51, 65, 85, 0.25)';
        ctx.stroke();
      });

      // 4. Project and sort all points by depth (Z)
      interface ProjectedPoint {
        x: number;
        y: number;
        z: number;
        size: number;
        color: string;
        countryId?: string;
        isCountryHub?: boolean;
        label?: string;
        origPoint: GlobePoint;
      }

      const projectedPoints: ProjectedPoint[] = [];

      points.forEach((pt) => {
        const v = latLonToVector3(pt.lat, pt.lon, currentRadius);

        // Y-axis rotation
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.z * cosY + v.x * sinY;
        // X-axis rotation
        const y1 = v.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + v.y * sinX;

        // Front vs Back visibility with smooth fade
        const alpha = Math.max(0.1, (z2 + currentRadius) / (2 * currentRadius));

        projectedPoints.push({
          x: cx + x1,
          y: cy + y1,
          z: z2,
          size: pt.size * (0.8 + alpha * 0.4),
          color: pt.color || 'rgba(148, 163, 184, 0.5)',
          countryId: pt.countryId,
          isCountryHub: pt.isCountryHub,
          label: pt.label,
          origPoint: pt,
        });
      });

      // Sort: back-to-front
      projectedPoints.sort((a, b) => a.z - b.z);

      // Render Projected Points
      projectedPoints.forEach((pt) => {
        if (pt.z < -currentRadius * 0.1) {
          // Render dim back particles
          ctx.fillStyle = 'rgba(51, 65, 85, 0.15)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(0.8, pt.size * 0.5), 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        const isCountryActive =
          stateRef.current.focusedCountryId === pt.countryId ||
          stateRef.current.hoveredCountryId === pt.countryId;

        // Territory cluster connector lines
        if (pt.isCountryHub && pt.z > 0) {
          // Draw pulsating territory radar circle
          const pulse = Math.sin(time * 3) * 3 + 6;
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = isCountryActive ? 2 : 1;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size + pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Hub core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size + 1, 0, Math.PI * 2);
          ctx.fill();

          // Outer glowing halo
          const haloGrad = ctx.createRadialGradient(pt.x, pt.y, 2, pt.x, pt.y, 22);
          haloGrad.addColorStop(0, pt.color);
          haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 22, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Render Labels for Hubs & Active Nodes
        if (pt.z > 20 && (pt.isCountryHub || isCountryActive)) {
          if (pt.label) {
            ctx.font = pt.isCountryHub
              ? `bold 12px 'Inter', sans-serif`
              : `600 10px 'Inter', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            // Background tag pill
            const textWidth = ctx.measureText(pt.label).width;
            const tagHeight = 18;
            const tagX = pt.x - textWidth / 2 - 6;
            const tagY = pt.y - pt.size - 20;

            ctx.fillStyle = isCountryActive
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(15, 23, 42, 0.75)';
            ctx.strokeStyle = pt.color;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.roundRect(tagX, tagY, textWidth + 12, tagHeight, 6);
            ctx.fill();
            ctx.stroke();

            // Text
            ctx.fillStyle = isCountryActive ? '#ffffff' : '#e2e8f0';
            ctx.fillText(pt.label, pt.x, tagY + 13);
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isAutoRotating]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Globe Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center rounded-3xl overflow-hidden glass-card border-slate-700/50 shadow-2xl bg-slate-950/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 group">
        <canvas ref={canvasRef} className="w-full h-full touch-none select-none block" />

        {/* 360° Drag & Control Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50 text-xs font-semibold text-amber-400 shadow-lg text-glow-amber">
            <Globe2 className="w-3.5 h-3.5 animate-spin text-amber-400" style={{ animationDuration: '8s' }} />
            <span>TechTerra &bull; 360° Interactive World Globe</span>
          </div>

          <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 pl-1 text-glow-white">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Click any territory pin or rotate freely in 3D</span>
          </div>
        </div>

        {/* Floating Tool Controls (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10 bg-slate-900/40 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/50 shadow-lg">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              isAutoRotating
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 text-glow-amber'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title={isAutoRotating ? 'Pause auto-spin' : 'Auto rotate globe'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => adjustZoom(0.15)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => adjustZoom(-0.15)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={resetView}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Territory Hover Tag / Toast */}
        {hoveredCountry && !selectedCountry && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 bg-slate-900/60 backdrop-blur-lg px-4 py-2 rounded-2xl border border-slate-700/60 shadow-2xl flex items-center gap-3 animate-fadeIn pointer-events-none">
            <span className="text-xl">{hoveredCountry.flagEmoji}</span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 text-glow-white">
                <span>{hoveredCountry.name}</span>
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: hoveredCountry.color }}
                />
              </div>
              <div className="text-[11px] text-slate-300">{hoveredCountry.specialty}</div>
            </div>
            <span className="text-xs font-semibold text-amber-400 ml-2 text-glow-amber">Click to Explore &rarr;</span>
          </div>
        )}

        {/* Interactive Quick Territory Switcher (Bottom Nav) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 overflow-x-auto pb-1 custom-scrollbar justify-center">
          {techCountries.map((country) => {
            const isSelected = selectedCountry?.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => focusCountry(country)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${
                  isSelected
                    ? 'bg-slate-900/80 text-white shadow-lg text-glow-white'
                    : 'bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 border-slate-700/50'
                }`}
                style={{
                  borderColor: isSelected ? country.color : undefined,
                  boxShadow: isSelected ? `0 0 16px rgba(${country.accentRgb}, 0.5)` : undefined,
                }}
              >
                <span>{country.flagEmoji}</span>
                <span>{country.name.split(' ')[0]}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: country.color }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Territory Detail Dossier Modal / Drawer */}
      {selectedCountry && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-lg z-[100] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedCountry(null)}
        >
          <div
            className="glass-card w-full max-w-2xl bg-slate-900/80 border-slate-700/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden relative my-auto animate-scaleUp max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: `rgba(${selectedCountry.accentRgb}, 0.5)` }}
          >
            {/* Country Header */}
            <div
              className="p-6 border-b border-slate-800 relative shrink-0"
              style={{
                background: `linear-gradient(135deg, rgba(${selectedCountry.accentRgb}, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border"
                    style={{
                      backgroundColor: `rgba(${selectedCountry.accentRgb}, 0.2)`,
                      borderColor: selectedCountry.color,
                    }}
                  >
                    {selectedCountry.flagEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {selectedCountry.codename}
                      </span>
                      <span className="text-xs font-semibold text-amber-400">
                        {selectedCountry.specialty}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {selectedCountry.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close dossier"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 mt-6 border-b border-slate-800/80">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-amber-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Territory Overview
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'skills'
                      ? 'border-amber-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tech Stack & Symbols ({selectedCountry.skills.length})
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'projects'
                      ? 'border-amber-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Built Projects ({selectedCountry.relatedProjects.length})
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2">
                      Territory Synopsis
                    </h4>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {selectedCountry.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-4 border-slate-700/50 bg-slate-900/30 backdrop-blur-md">
                      <div className="text-xs text-slate-300 font-medium">Total Tech Artifacts</div>
                      <div className="text-2xl font-black text-white mt-1 text-glow-white">
                        {selectedCountry.skills.length} Stack Tools
                      </div>
                    </div>
                    <div className="glass-card p-4 border-slate-700/50 bg-slate-900/30 backdrop-blur-md">
                      <div className="text-xs text-slate-300 font-medium">Avg. Proficiency</div>
                      <div
                        className="text-2xl font-black mt-1 text-glow-amber"
                        style={{ color: selectedCountry.color }}
                      >
                        {Math.round(
                          selectedCountry.skills.reduce((acc, s) => acc + s.proficiency, 0) /
                            selectedCountry.skills.length
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 text-glow-amber mb-3">
                      Territory Flagship Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry.skills.map((skill) => {
                        const tech = getTechItem(skill.name);
                        const TechIconComponent = tech.icon;
                        return (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-white hover:border-amber-500/50 transition-all text-glow-white"
                          >
                            <TechIconComponent className="w-4 h-4" />
                            <span>{skill.name}</span>
                            <span className="text-amber-400 text-[11px] font-bold">
                              {skill.proficiency}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2">
                    Verified Tools, Frameworks & Symbols
                  </h4>
                  <div className="space-y-3">
                    {selectedCountry.skills.map((skill) => {
                      const tech = getTechItem(skill.name);
                      const TechIconComponent = tech.icon;
                      return (
                        <div
                          key={skill.name}
                          className="glass-card p-4 border-slate-800 hover:border-slate-700 bg-slate-900/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                              style={{
                                backgroundColor: `rgba(${selectedCountry.accentRgb}, 0.15)`,
                                borderColor: `rgba(${selectedCountry.accentRgb}, 0.3)`,
                              }}
                            >
                              <TechIconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-2">
                                <span>{skill.name}</span>
                                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {tech.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">{skill.role}</p>
                            </div>
                          </div>

                          <div className="w-full sm:w-44">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Mastery</span>
                              <span className="font-bold text-amber-400">{skill.proficiency}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full transition-all duration-700"
                                style={{
                                  width: `${skill.proficiency}%`,
                                  background: `linear-gradient(90deg, ${selectedCountry.color}, ${selectedCountry.secondaryColor})`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2">
                    Production Systems Built in This Territory
                  </h4>
                  <div className="space-y-3">
                    {selectedCountry.relatedProjects.map((projTitle) => {
                      const project = projectList.find((p) => p.title.includes(projTitle) || projTitle.includes(p.title));
                      return (
                        <div
                          key={projTitle}
                          className="glass-card p-4 border-slate-800 hover:border-amber-500/30 bg-slate-900/70 transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="font-bold text-white text-sm truncate">{projTitle}</h5>
                              <p className="text-xs text-slate-400 truncate">
                                {project?.tagline || 'Engineered with the tech stack of this region.'}
                              </p>
                            </div>
                          </div>

                          {project?.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 transition-colors border border-slate-700"
                            >
                              <span>View Code</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center shrink-0">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Coordinates: {selectedCountry.centerLat}° N, {selectedCountry.centerLon}° E</span>
              </span>

              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Done Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
