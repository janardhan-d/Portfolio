import React, { useState } from 'react';
import { 
  FileCode2, 
  Layout, 
  Database, 
  Monitor, 
  Wrench, 
  Search, 
  Sparkles, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

const iconMap = {
  FileCode2: FileCode2,
  Layout: Layout,
  Database: Database,
  Monitor: Monitor,
  Wrench: Wrench,
};

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...skillsData.map((c) => c.category)];

  const filteredCategories = skillsData.map((cat) => {
    const filteredSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, skills: filteredSkills };
  }).filter((cat) => 
    selectedCategory === 'All' ? cat.skills.length > 0 : cat.category === selectedCategory && cat.skills.length > 0
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Skills & <span className="gradient-text-gold">Technologies</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mt-3 font-medium leading-relaxed">
            Grouped technical skills across Python ecosystem, full-stack web stack, desktop GUI engineering, and data tools.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-200/80 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-300 dark:border-amber-500/30 w-full sm:w-auto overflow-x-auto shadow-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Python, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-amber-500/30 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => {
            const IconComponent = iconMap[group.icon] || FileCode2;

            return (
              <div
                key={group.category}
                className="glass-panel rounded-2xl p-6 neon-border-hover flex flex-col justify-between shadow-2xl"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skill Items Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                          skill.highlight
                            ? 'bg-slate-100 dark:bg-slate-900 border border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        {skill.highlight ? (
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-amber-500" />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 text-[11px] text-slate-500 dark:text-slate-300 font-mono flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                  <span>{group.skills.length} skills listed</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">Verified Stack</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
