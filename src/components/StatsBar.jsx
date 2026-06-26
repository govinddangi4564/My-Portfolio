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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1100px] mx-auto px-4 sm:px-6 -mt-8 mb-8 relative z-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-panel flex flex-col items-center justify-center py-6 px-4 text-center group cursor-default"
          >
            <span className="font-syne text-[2rem] font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent leading-none">
              {stat.num}
            </span>
            <span className="font-mono text-[0.78rem] uppercase tracking-[1.2px] text-text mt-2">
              {stat.label}
            </span>
            <span className="font-body text-[0.72rem] text-dimmed mt-0.5">
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
