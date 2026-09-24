import React from 'react';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Typewriter } from './Typewriter';
import { SpiralText } from './text-fx/SpiralText';
import { WaveShimmerText } from './text-fx/WaveShimmerText';
import { TextFXShowcase } from './text-fx/TextFXShowcase';

export const Hero: React.FC = () => {
  const heroTypewriterPhrases = [
    'Transformer Model Optimization',
    'Edge AI & Model Compression',
    'Reactive Full-Stack Architecture',
    'Threat Intelligence Threat-Hunting Systems',
    'High-Performance Deep Learning Benchmarks',
  ];

  return (
    <section id="home" className="section min-h-screen flex flex-col justify-center items-start pt-24 pb-12 relative">
      <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
        {/* Left Column Text Content */}
        <div className="lg:col-span-8 hero-content">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-glow-amber" />
            <span>Undergraduate @ NIT Meghalaya &bull; SURAJ Fellow @ IIT Jodhpur</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight">
            ML Engineer &{' '}
            <WaveShimmerText text="Full-Stack" className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />{' '}
            Developer
          </h1>

          {/* Type In - Type Out Dynamic Role Subtitle Powered by Framer Motion Typewriter */}
          <div className="mt-4 flex items-center gap-2 text-amber-400 font-mono text-base sm:text-xl font-bold flex-wrap">
            <Code2 className="w-5 h-5 text-amber-400 shrink-0 text-glow-amber" />
            <span className="text-slate-400 text-sm sm:text-base font-normal">Specializing in:</span>
            <Typewriter
              words={heroTypewriterPhrases}
              typingSpeed={55}
              deletingSpeed={28}
              delayBetweenWords={2000}
              className="text-amber-400 text-glow-amber font-bold"
            />
          </div>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Specializing in Transformer model optimization and building intelligent, scalable web applications. Currently exploring the frontiers of efficient AI deployment for resource-constrained environments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center gap-2 group text-glow-white"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/RSaha0507"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-md border border-slate-700/60 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm text-glow-white"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Kinetic Spiral Badge */}
        <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
          <div className="glass-card p-6 rounded-3xl border-slate-700/50 bg-slate-950/20 backdrop-blur-md flex flex-col items-center gap-4 hover:border-amber-500/40 transition-all duration-300">
            <SpiralText
              text="• MACHINE LEARNING RESEARCHER • FULL STACK ARCHITECT • NIT MEGHALAYA • 9.39 CGPA • SURAJ FELLOW •"
              radius={72}
              speed={16}
            />
            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 text-glow-amber block font-bold">
                Kinetic 3D Spiral Badge
              </span>
              <span className="text-[10px] text-slate-400">
                Continuous double-orbital path (hover to accelerate)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Text FX Showcase Engine */}
      <TextFXShowcase />
    </section>
  );
};

