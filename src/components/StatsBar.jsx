import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

const telemetryStats = [
  {
    num: '6+',
    label: 'Systems Built',
    sub: 'Full-Stack, Distributed, AI',
    icon: Cpu,
    tag: 'Production Ready',
    tagColor: 'text-brand-pink border-brand-pink/30 bg-brand-pink/10',
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
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {telemetryStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="p-3.5 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between group cursor-default hover:border-zinc-700 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className={`font-mono text-[0.55rem] sm:text-[0.62rem] uppercase tracking-wider px-2 py-0.5 rounded-md border font-semibold ${stat.tagColor}`}>
                {stat.tag}
              </span>
              <stat.icon size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
            </div>

            <div className="my-0.5 sm:my-1">
              <span className="font-syne text-[1.5rem] sm:text-[2.2rem] font-black text-white leading-none tracking-tight">
                {stat.num}
              </span>
            </div>

            <div className="mt-1.5 sm:mt-2">
              <span className="font-mono text-[0.68rem] sm:text-[0.76rem] font-bold uppercase tracking-wider text-zinc-200 block truncate">
                {stat.label}
              </span>
              <span className="font-body text-[0.62rem] sm:text-[0.72rem] text-zinc-400 block mt-0.5 truncate">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

