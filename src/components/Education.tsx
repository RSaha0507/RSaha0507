import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2">
          Academic Journey
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          My Education
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {educationData.map((edu, idx) => (
          <div
            key={idx}
            className="glass-card glass-card-hover p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-slate-700/50 bg-slate-900/25 backdrop-blur-md shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <GraduationCap className="w-7 h-7 text-glow-amber" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 text-glow-white">
                {edu.degree}
              </h3>
              <p className="text-base text-amber-200/90 font-medium mb-3 text-glow-amber">
                {edu.institution}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{edu.date}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">&bull;</span>
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-glow-amber">
                  <Award className="w-4 h-4" />
                  <span>{edu.gpa}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
