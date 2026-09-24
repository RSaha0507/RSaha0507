import React from 'react';
import { Mail, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { Typewriter } from './Typewriter';

export const Contact: React.FC = () => {
  const contactActionPhrases = [
    'Collaborate on ML Research',
    'Optimize Transformer Inference',
    'Build High-Impact Full-Stack Apps',
    'Discuss Edge AI Deployment',
  ];

  return (
    <section id="contact" className="section py-24 border-t border-slate-800/60 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to research & development opportunities</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Let's Build Together
        </h2>

        {/* Dynamic Typewriter Action Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs sm:text-sm font-mono mb-6">
          <MessageSquareCode className="w-4 h-4 text-amber-400 shrink-0 text-glow-amber" />
          <span className="text-slate-400">Ready to:</span>
          <Typewriter
            words={contactActionPhrases}
            typingSpeed={50}
            deletingSpeed={25}
            delayBetweenWords={2200}
            className="text-amber-400 text-glow-amber font-bold"
          />
        </div>

        <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
          Have a project in mind, an interesting research problem in Transformer efficiency, or looking for a passionate developer to join your team? I'd love to connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:rs574.cs008@gmail.com"
            className="contact-cta-btn inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-xl shadow-amber-500/20 hover:scale-[1.02] text-glow-white"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Me</span>
          </a>

          <a
            href="https://linkedin.com/in/rounak-saha-932ab0253"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-md text-white font-semibold px-6 py-4 rounded-xl text-lg transition-all duration-200 border border-slate-700/60 text-glow-white"
          >
            <LinkedinIcon className="w-5 h-5 text-sky-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="https://github.com/RSaha0507"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-md text-white font-semibold px-6 py-4 rounded-xl text-lg transition-all duration-200 border border-slate-700/60 text-glow-white"
          >
            <GithubIcon className="w-5 h-5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
