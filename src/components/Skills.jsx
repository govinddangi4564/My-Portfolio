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
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="font-mono text-[0.74rem] uppercase tracking-widest text-rose-300 font-semibold">
            03. technical telemetry
          </span>
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
          My Skills &amp; Tech Stack
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-baseline">
          <div className="text-white text-lg sm:text-xl">
            <div className="font-semibold">I build systems for people</div>
            <div className="font-serif font-normal italic text-rose-300">
              I can Design, Architect, Deploy
            </div>
          </div>
          <p className="font-body text-[0.9rem] sm:text-[1rem] text-zinc-400 leading-relaxed">
            Specializing in the Java &amp; Spring Boot ecosystem for high-throughput backends and React for modern client interfaces. Focused on ACID transactional reliability, secure authentication, and low-latency system performance.
          </p>
        </div>
      </motion.div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        {tabKeys.map((tab) => {
          const isSelected = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              type="button"
              className={`cursor-pointer select-none rounded-xl px-4 sm:px-5 py-2 font-mono text-[0.74rem] sm:text-[0.8rem] transition-all duration-200 flex items-center gap-2.5 ${isSelected
                  ? 'bg-white text-black font-bold shadow-md scale-[1.02]'
                  : 'bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
            >
              <tab.icon size={15} />
              <span>{tab.label.split(' ')[0]}</span>
              <span className={`text-[0.6rem] px-2 py-0.5 rounded-full border hidden sm:inline-block ${isSelected ? 'bg-zinc-200 text-black border-zinc-300' : 'bg-black/40 text-zinc-400 border-white/10'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skill Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {skillTabs[active].map((skill) => (
            <TiltCard
              key={skill.name}
              maxTilt={8}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between group cursor-default hover:border-zinc-700 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all"
            >
              <div className="mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[1.4rem] sm:text-[1.8rem] transition-transform duration-300 group-hover:scale-110 shrink-0">
                    {skill.icon}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-syne text-[0.92rem] sm:text-[1.05rem] font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                      {skill.name}
                    </h4>
                    <span className="font-mono text-[0.58rem] sm:text-[0.64rem] text-zinc-400 uppercase tracking-wider block truncate font-medium">
                      {skill.tier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Real Project Association Pill */}
              <div className="pt-2.5 border-t border-zinc-800/80 flex items-center gap-1.5">
                <CheckCircle2 size={11} className="text-rose-300 shrink-0" />
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-400 truncate" title={skill.usedIn}>
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

