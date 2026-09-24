import React from 'react';
import { TechWorldGlobe, techCountries } from './TechWorldGlobe';
import { Globe2, GraduationCap, Sparkles } from 'lucide-react';
import { FadeInOutText } from './text-fx/FadeInOutText';
import { ScrambleText } from './text-fx/ScrambleText';

export const About: React.FC = () => {
  const researchHighlights = [
    { prefix: 'Active Focus:', text: 'Multi-Head Attention Head Pruning', tag: 'SURAJ IITJ', color: '#f59e0b' },
    { prefix: 'Architecture:', text: 'Distributed Edge Inference Engines', tag: 'PyTorch/C++', color: '#38bdf8' },
    { prefix: 'Web Systems:', text: 'Zero-Latency Reactive Full-Stack Platforms', tag: 'React/FastAPI', color: '#10b981' },
    { prefix: 'Cybersecurity:', text: 'Automated Threat Intelligence Aggregation', tag: 'Defensive Ops', color: '#a855f7' },
  ];

  return (
    <section id="about" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2 flex items-center justify-center gap-1.5 text-glow-amber">
          <Globe2 className="w-4 h-4" />
          <span>Interactive Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          About
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Explore my skills clustered into distinct continents on a 360° interactive planet. Drag to rotate, zoom, or click any territory to inspect stack depth.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Bio Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>NIT Meghalaya &bull; CSE '26</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Bridging Machine Learning Research with Full-Stack Engineering
            </h3>
          </div>

          {/* Fade In - Fade Out Dynamic Research Highlights */}
          <div className="p-3 rounded-xl bg-slate-900/30 backdrop-blur-md border border-slate-700/50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 text-glow-amber" />
            <FadeInOutText items={researchHighlights} duration={3200} className="text-xs sm:text-sm font-medium" />
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I'm a Computer Science undergraduate at <strong className="text-white font-bold text-glow-white">NIT Meghalaya</strong> with a high academic record (9.39 CGPA). My journey spans from benchmarking and compressing multi-head Transformer models at <strong className="text-amber-300 font-bold text-glow-amber">IIT Jodhpur (SURAJ Fellowship)</strong> to engineering production-grade full-stack platforms and threat intelligence aggregators.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I specialize in deconstructing computational bottlenecks, applying structured pruning and INT8 quantization for edge AI, and orchestrating reactive web applications with React, Python, and cloud databases.
          </p>

          {/* Academic Metric Badges */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="glass-card p-4 border border-amber-500/30 bg-slate-900/20 backdrop-blur-md shadow-lg shadow-amber-500/5 hover:border-amber-400/60 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono text-glow-amber">9.39</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold text-glow-white tracking-wide">NIT Meghalaya CGPA</div>
            </div>
            <div className="glass-card p-4 border border-amber-500/30 bg-slate-900/20 backdrop-blur-md shadow-lg shadow-amber-500/5 hover:border-amber-400/60 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono text-glow-amber">3748</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold text-glow-white tracking-wide">GATE 2025 DA Rank</div>
            </div>
          </div>

          {/* Continent Territory Summary Pills */}
          <div className="pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 text-glow-amber block mb-2">
              Clustered Realms
            </span>
            <div className="grid grid-cols-2 gap-2">
              {techCountries.map((c) => (
                <div
                  key={c.id}
                  className="p-2.5 rounded-xl bg-slate-900/30 backdrop-blur-md border border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-900/50 transition-all duration-200 flex items-center gap-2 text-xs group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{c.flagEmoji}</span>
                  <div className="min-w-0">
                    <p className="text-white font-bold truncate text-glow-white">
                      <ScrambleText text={`${c.name.split(' ')[0]} Realm`} scrambleSpeed={20} />
                    </p>
                    <p className="text-[10px] text-slate-300 truncate">{c.skills.length} Stack Tools</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 3D Globe Column */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <TechWorldGlobe />
        </div>
      </div>
    </section>
  );
};
