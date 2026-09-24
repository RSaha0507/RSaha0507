import React from 'react';
import { Trophy } from 'lucide-react';
import { awardsList } from '../data/portfolioData';

export const Awards: React.FC = () => {
  return (
    <section id="awards" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2">
          Recognitions
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Awards & Achievements
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {awardsList.map((item, idx) => (
          <div
            key={idx}
            className="award-card glass-card glass-card-hover p-5 sm:p-6 flex items-center gap-4 border-slate-700/50 bg-slate-900/25 backdrop-blur-md shadow-xl hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <Trophy className="w-6 h-6 text-glow-amber" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg text-glow-white">{item.award}</h3>
              <p className="text-sm text-slate-300 mt-0.5">{item.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
