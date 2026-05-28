import { motion } from 'framer-motion';

const stats = [
  { num: '6+', label: 'Projects', sub: 'built & delivered' },
  { num: '4', label: 'Core Stacks', sub: 'Java · React · Node · Python' },
  { num: 'B.Tech', label: 'CSE Student', sub: '2023 – 2027' },
  { num: '∞', label: 'Curiosity', sub: 'always learning' },
];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="border-y border-[var(--border)]"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-hover-border flex flex-col items-center justify-center py-8 px-4 text-center transition-colors duration-300 hover:bg-accent/[0.03] ${
              i < stats.length - 1 ? 'md:border-r border-[var(--border)]' : ''
            } ${i < 2 ? 'border-b md:border-b-0 border-[var(--border)]' : ''}`}
          >
            <span className="font-mono text-[1.8rem] font-extrabold text-accent2 leading-none">
              {stat.num}
            </span>
            <span className="font-mono text-[0.85rem] uppercase tracking-[1.5px] text-text mt-2">
              {stat.label}
            </span>
            <span className="font-mono text-[0.72rem] text-dimmed mt-0.5">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
