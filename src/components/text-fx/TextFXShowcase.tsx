import React, { useState } from 'react';
import { Typewriter } from '../Typewriter';
import { FadeInOutText } from './FadeInOutText';
import { SpiralText } from './SpiralText';
import { ScrambleText } from './ScrambleText';
import { WaveShimmerText } from './WaveShimmerText';
import { Sparkles, Terminal, RefreshCw, Compass, Binary, Layers } from 'lucide-react';

export const TextFXShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'typewriter' | 'spiral' | 'fade' | 'scramble' | 'wave'>('typewriter');

  const typewriterPhrases = [
    'Transformer Model Optimization & Attention Pruning',
    'Low-Latency Edge AI & INT8 Quantization',
    'Full-Stack Reactive Architectures with React & Cloud DBs',
    'Threat Intelligence Aggregators & Automated Scanning',
    'High-Performance Deep Learning Research @ IIT Jodhpur',
  ];

  const fadeInOutItems = [
    { prefix: 'Specialty:', text: 'Transformer Layer Benchmarking', tag: 'SURAJ Fellowship', color: '#f59e0b' },
    { prefix: 'Academic:', text: '9.39 CGPA in Computer Science', tag: 'NIT Meghalaya', color: '#fbbf24' },
    { prefix: 'Competitive:', text: 'AIR 3748 in GATE 2025 Data Science & AI', tag: 'Top 5%', color: '#38bdf8' },
    { prefix: 'Engineering:', text: 'Production TypeScript & Python Ecosystems', tag: 'Full-Stack', color: '#10b981' },
  ];

  return (
    <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border-slate-700/50 bg-slate-950/30 backdrop-blur-md shadow-2xl mt-8">
      {/* Header with Mode Switcher Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/40 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white text-glow-white flex items-center gap-1.5">
              <span>Dynamic Text Animation Engine</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400">
                5 Modes
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">Interactive live typography visualizers</p>
          </div>
        </div>

        {/* Animation Mode Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'typewriter', label: 'Type In/Out', icon: Terminal },
            { id: 'spiral', label: '3D Spiral', icon: Compass },
            { id: 'fade', label: 'Fade In/Out', icon: RefreshCw },
            { id: 'scramble', label: 'Matrix Decode', icon: Binary },
            { id: 'wave', label: 'Wave Shimmer', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer backdrop-blur-md border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 border-slate-700/40'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Active Animation Display Stage */}
      <div className="min-h-[90px] flex items-center justify-center p-3 rounded-xl bg-slate-900/20 border border-slate-800/60">
        {activeTab === 'typewriter' && (
          <div className="text-center sm:text-left w-full space-y-1">
            <span className="text-[10px] uppercase font-mono text-amber-400/90 tracking-wider block">
              &gt; Execution Pipeline Status:
            </span>
            <div className="text-sm sm:text-base font-mono font-bold text-white text-glow-white">
              <Typewriter words={typewriterPhrases} typingSpeed={55} deletingSpeed={28} delayBetweenWords={2000} />
            </div>
          </div>
        )}

        {activeTab === 'spiral' && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            <SpiralText
              text="• MACHINE LEARNING RESEARCHER • FULL STACK ARCHITECT • NIT MEGHALAYA • 9.39 CGPA • SURAJ FELLOW •"
              radius={65}
              speed={14}
            />
            <div className="text-center sm:text-left max-w-xs space-y-1">
              <span className="text-xs font-bold text-amber-400 text-glow-amber">
                3D Kinetic Archimedean Spiral
              </span>
              <p className="text-xs text-slate-300">
                Continuous double-orbital typography ribbon. Hover over the badge to modulate rotation velocity and depth glow.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'fade' && (
          <div className="text-center sm:text-left w-full space-y-1">
            <span className="text-[10px] uppercase font-mono text-amber-400/90 tracking-wider block">
              &bull; Academic & Fellowship Keyframe Highlights:
            </span>
            <div className="text-sm sm:text-base font-semibold">
              <FadeInOutText items={fadeInOutItems} duration={3000} />
            </div>
          </div>
        )}

        {activeTab === 'scramble' && (
          <div className="text-center sm:text-left w-full space-y-2">
            <span className="text-[10px] uppercase font-mono text-amber-400/90 tracking-wider block">
              &gt; Cyber Matrix Decoding Glyphs (Hover each item to re-scramble):
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'QUANTIZED_TRANSFORMER_V3',
                'SURFACE_ATTENTION_PRUNING',
                'REACT_18_VIRTUAL_DOM',
                'NIT_MEGHALAYA_9.39',
                'IIT_JODHPUR_SURAJ_2024',
              ].map((term) => (
                <span
                  key={term}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs text-slate-200 hover:border-amber-400/60 transition-colors"
                >
                  <ScrambleText text={term} scrambleSpeed={24} />
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wave' && (
          <div className="text-center w-full space-y-2 py-1">
            <span className="text-[10px] uppercase font-mono text-amber-400/90 tracking-wider block">
              &bull; Wave Bounce & Spectral Gradient Shimmer:
            </span>
            <div className="text-base sm:text-xl">
              <WaveShimmerText text="OPTIMIZED TRANSFORMERS & SCALABLE FULL-STACK WEB APPS" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
