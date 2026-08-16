import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

const telemetryStats = [
  {
    num: '6+',
    label: 'Systems Built',
    sub: 'Full-Stack, Distributed, AI',
    icon: Cpu,
    tag: 'Production Ready',
    tagColor: 'text-accent border-accent/30 bg-accent/10',
  },
  {
    num: '90.75%',
    label: 'Academic Merit',
    sub: 'Class 10th Distinction',
    icon: Award,
    tag: 'Excellence',
    tagColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  },
  {
    num: '100%',
    label: 'ACID & 2FA Auth',
    sub: 'Security-First Architectures',
    icon: ShieldCheck,
    tag: 'Zero-Trust',
    tagColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  },
  {
    num: '~85%',
    label: 'NLP Accuracy',
    sub: 'Sentence-BERT Semantic Matching',
    icon: Database,
    tag: 'AI Integrated',
    tagColor: 'text-accent2 border-accent2/30 bg-accent2/10',
  },
];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-2 sm:-mt-6 mb-8 sm:mb-12 relative z-10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {telemetryStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="bento-card p-3 sm:p-5 flex flex-col justify-between group cursor-default"
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-3">
              <span className={`font-mono text-[0.55rem] sm:text-[0.62rem] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border ${stat.tagColor}`}>
                {stat.tag}
              </span>
              <stat.icon size={14} className="sm:w-4 sm:h-4 text-dimmed group-hover:text-accent2 transition-colors" />
            </div>

            <div className="my-0.5 sm:my-1">
              <span className="font-syne text-[1.45rem] sm:text-[2.1rem] font-black telemetry-val leading-none tracking-tight">
                {stat.num}
              </span>
            </div>

            <div className="mt-1 sm:mt-2">
              <span className="font-mono text-[0.68rem] sm:text-[0.76rem] font-bold uppercase tracking-wider text-text block truncate">
                {stat.label}
              </span>
              <span className="font-body text-[0.62rem] sm:text-[0.72rem] text-dimmed block mt-0.5 truncate">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

