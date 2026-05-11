import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillTabs } from '../data/skills';

const tabKeys = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Tools & Languages' },
];

export default function Skills() {
  const [active, setActive] = useState('frontend');

  return (
    <section id="skills" className="section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
        <span className="section-tag">04. tools &amp; tech</span>
        <h2 className="section-title">Tech Stack</h2>
      </motion.div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-8">
        {tabKeys.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`font-mono text-[0.7rem] uppercase tracking-[1px] px-4 py-2 rounded border transition-all duration-300 ${
              active === tab.key
                ? 'bg-accent/10 border-accent text-accent'
                : 'border-[var(--border)] text-muted hover:border-accent/30 hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {skillTabs[active].map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group p-4 flex items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-card hover:-translate-y-1 hover:border-accent2/40 hover:shadow-[0_8px_24px_var(--accent2-soft-glow)] transition-all duration-300"
          >
            <span className="text-[1.6rem]">{skill.icon}</span>
            <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-wide text-text">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
