import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-white font-bold text-base">Rounak Saha</p>
          <p className="text-xs text-slate-400 mt-1">
            Machine Learning Engineer & Full-Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/RSaha0507"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/rounak-saha-932ab0253"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:rs574.cs008@gmail.com"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
