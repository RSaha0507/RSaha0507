import React from 'react';
import { Briefcase, Users, Star } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const getIcon = (role: string) => {
    if (role.includes('Intern')) return <Briefcase className="w-3.5 h-3.5 text-slate-950" />;
    if (role.includes('Coordinator') || role.includes('Convener')) return <Users className="w-3.5 h-3.5 text-slate-950" />;
    return <Star className="w-3.5 h-3.5 text-slate-950" />;
  };

  return (
    <section id="experience" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2">
          Experience & Leadership
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Career Timeline
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-0.5 bg-slate-700/80" />

        <div className="space-y-8 md:space-y-12">
          {experienceData.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Box */}
                <div
                  className={`w-full md:w-5/12 ${
                    isEven ? 'timeline-card-left' : 'timeline-card-right'
                  }`}
                >
                  <div className="glass-card glass-card-hover p-6 border-slate-700/50 bg-slate-900/25 backdrop-blur-md shadow-xl">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold text-xs mb-2 text-glow-amber">
                      {exp.date}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 text-glow-white">
                      {exp.role}
                    </h3>
                    <p className="text-amber-300 font-medium text-sm mb-3 text-glow-amber">
                      {exp.company}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Center Node */}
                <div className="hidden md:flex z-10 bg-amber-500 rounded-full w-7 h-7 items-center justify-center shadow-lg shadow-amber-500/40 ring-4 ring-slate-900 mx-auto">
                  {getIcon(exp.role)}
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
