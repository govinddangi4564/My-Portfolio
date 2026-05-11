import { motion } from 'framer-motion';

const timelineItems = [
  { date: '2025 · present', title: 'HireDrift — NLP Resume Screener', desc: 'Frontend Developer · Sentence-BERT semantic matching · 85% accuracy', dotColor: 'bg-accent' },
  { date: '2024 · present', title: 'PathLab Management System', desc: 'Java Servlets · MySQL · BCrypt · 2FA · Admin analytics dashboard', dotColor: 'bg-accent2' },
  { date: '2024', title: 'E-Commerce System (Shopkeeper)', desc: 'MVC architecture · DAO pattern · JDBC · CRUD operations', dotColor: 'bg-accent3' },
  { date: '2023', title: 'B.Tech CSE @ Prestige Institute', desc: 'Started engineering at PIEMR · CGPA 6.96 · Indore, MP', dotColor: 'bg-accent' },
];

export default function Timeline() {
  return (
    <div className="mt-10">
      <span className="section-tag">02. journey</span>
      <div className="relative mt-4 pl-6 border-l border-[var(--border)]">
        {timelineItems.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="relative mb-8 last:mb-0">
            <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full ${item.dotColor} ring-4 ring-bg`} />
            <span className="font-mono text-[0.65rem] text-accent2 tracking-wide">{item.date}</span>
            <h4 className="font-syne text-[0.95rem] font-bold text-text mt-0.5">{item.title}</h4>
            <p className="font-mono text-[0.72rem] text-muted mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
