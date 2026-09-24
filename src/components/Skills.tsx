import React, { useState } from 'react';
import { Sparkles, Code2, Cpu, Wrench, Search } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { getTechItem } from './TechIcons';

export const Skills: React.FC = () => {
  const categories = Object.keys(skillsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (category: string) => {
    if (category.includes('Languages') || category.includes('Databases')) {
      return <Code2 className="w-4 h-4" />;
    }
    if (category.includes('Frameworks') || category.includes('Libraries')) {
      return <Cpu className="w-4 h-4" />;
    }
    return <Wrench className="w-4 h-4" />;
  };

  const filteredSkills = searchQuery
    ? Object.values(skillsData)
        .flat()
        .filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : skillsData[activeCategory] || [];

  return (
    <section id="skills" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Technical Proficiency & Tools
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Every language, framework, database, and platform utilized across research and production applications.
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-6 sm:p-10 border-slate-700/50 bg-slate-950/20 backdrop-blur-md shadow-2xl relative">
        {/* Search & Category Filter Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700/50 pb-6 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 backdrop-blur-md ${
                  activeCategory === category && !searchQuery
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-bold text-glow-white'
                    : 'text-slate-300 hover:text-white bg-slate-900/30 hover:bg-slate-900/60 border border-slate-700/40 hover:border-slate-600'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-60 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid with Brand Symbols & Styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const tech = getTechItem(skill.name);
            const TechIconComponent = tech.icon;

            return (
              <div
                key={skill.name}
                className="glass-card p-4 rounded-2xl border-slate-700/50 hover:border-amber-500/50 bg-slate-900/25 hover:bg-slate-900/45 backdrop-blur-md transition-all duration-300 group shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Stylized Brand Symbol Emblem */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-sm backdrop-blur-md"
                      style={{
                        backgroundColor: `${tech.color}15`,
                        borderColor: `${tech.color}40`,
                      }}
                    >
                      <TechIconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5 text-glow-white">
                        <span>{skill.name}</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {tech.category}
                      </span>
                    </div>
                  </div>

                  {/* Percentage Metric */}
                  <div className="text-right">
                    <span className="font-black text-sm text-amber-400 font-mono text-glow-amber">
                      {skill.proficiency}%
                    </span>
                    <span className="block text-[10px] text-slate-400">Mastery</span>
                  </div>
                </div>

                {/* Progress Bar with Glowing Accent */}
                <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full skill-bar-fill shadow-sm"
                    data-proficiency={skill.proficiency}
                    style={{
                      width: `${skill.proficiency}%`,
                      background: `linear-gradient(90deg, #f59e0b 0%, ${tech.color} 100%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>No tools found matching "{searchQuery}".</p>
          </div>
        )}
      </div>
    </section>
  );
};
