import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillTabs } from '../data/skills';
import TiltCard from './TiltCard';
import SectionParallax from './SectionParallax';
import { Server, Globe, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

const tabKeys = [
  { key: 'backend', label: 'Backend & Java Ecosystem', icon: Server, count: `${skillTabs.backend.length} Techs` },
  { key: 'frontend', label: 'Frontend & UI Engineering', icon: Globe, count: `${skillTabs.frontend.length} Techs` },
  { key: 'tools', label: 'DevOps, Tools & IDEs', icon: Terminal, count: `${skillTabs.tools.length} Tools` },
];


export default function Skills() {
  const [active, setActive] = useState('backend');

  return (
    <SectionParallax id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-accent w-4 h-4" />
          <span className="section-tag m-0">03. technical telemetry</span>
        </div>
        <h2 className="section-title">Skills & Production Stacks</h2>
        <p className="font-body text-[1rem] text-muted -mt-4 max-w-2xl leading-relaxed">
          Technologies categorized by real-world engineering depth and implementation history across production systems.
        </p>
      </motion.div>

      {/* Tab Buttons */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-5 sm:mb-8">
        {tabKeys.map((tab) => {
          const isSelected = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              type="button"
              className={`p-2.5 sm:p-4 rounded-xl font-mono text-left transition-all duration-300 flex items-center justify-between group ${
                isSelected
                  ? 'bg-accent/15 border-2 border-accent text-text shadow-[0_0_20px_var(--card-hover-glow)]'
                  : 'bg-surface/60 border border-[var(--border)] text-muted hover:border-accent/40 hover:text-text'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${isSelected ? 'bg-accent text-white' : 'bg-surface text-muted group-hover:text-accent'}`}>
                  <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="font-syne text-[0.72rem] sm:text-[0.85rem] font-bold block text-text truncate">
                    {tab.label.split(' ')[0]}
                  </span>
                  <span className="text-[0.58rem] sm:text-[0.68rem] text-dimmed hidden sm:block truncate">
                    {tab.label}
                  </span>
                </div>
              </div>
              <span className="text-[0.55rem] sm:text-[0.62rem] px-1.5 sm:px-2 py-0.5 rounded-full bg-surface border border-[var(--border)] text-accent2 shrink-0 hidden xs:inline-block">
                {tab.count.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skill Grid - Compact 2-column on mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4"
        >
          {skillTabs[active].map((skill) => (
            <TiltCard
              key={skill.name}
              maxTilt={8}
              className="bento-card p-3 sm:p-5 flex flex-col justify-between group cursor-default hover:border-accent2/50"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-[1.3rem] sm:text-[1.8rem] transition-transform duration-300 group-hover:scale-110 shrink-0">
                      {skill.icon}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-syne text-[0.82rem] sm:text-[1rem] font-bold text-text group-hover:text-accent2 transition-colors truncate">
                        {skill.name}
                      </h4>
                      <span className="font-mono text-[0.55rem] sm:text-[0.62rem] text-dimmed uppercase tracking-wider block truncate">
                        {skill.tier}
                      </span>
                    </div>
                  </div>
                  
                  <span className="font-mono text-[0.65rem] sm:text-[0.72rem] font-bold text-accent2 shrink-0">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 sm:h-1.5 bg-surface rounded-full overflow-hidden mb-2 sm:mb-3 border border-[var(--border)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
                  />
                </div>
              </div>

              {/* Real Project Association Pill */}
              <div className="pt-2 border-t border-[var(--border)] flex items-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                <span className="font-mono text-[0.58rem] sm:text-[0.65rem] text-dimmed truncate" title={skill.usedIn}>
                  {skill.usedIn}
                </span>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionParallax>
  );
}

