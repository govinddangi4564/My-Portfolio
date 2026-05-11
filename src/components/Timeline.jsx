import { motion } from "framer-motion";

const timelineItems = [
  {
    date: "2020",
    title: "Secondary (10th Grade)",
    desc: "Saraswati Shishu Mandir School · Percentage: 90.75%",
    dotColor: "bg-accent",
  },
  {
    date: "2022",
    title: "Higher Secondary (12th Grade) PCM",
    desc: "Saraswati Shishu Mandir School · Percentage: 82.4%",
    dotColor: "bg-accent2",
  },
  {
    date: "2023 · present",
    title: "B.Tech CSE @PIEMR, Indore",
    desc: "Started engineering at PIEMR · CGPA 6.96 · Indore, MP",
    dotColor: "bg-accent3",
  },
];

export default function Timeline() {
  return (
    <div className="mt-10">
      <span className="section-tag">02. journey</span>
      <div className="relative mt-4 pl-6 border-l border-[var(--border)]">
        {timelineItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative mb-8 last:mb-0"
          >
            <div
              className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full ${item.dotColor} ring-4 ring-bg`}
            />
            <span className="font-mono text-[0.65rem] text-accent2 tracking-wide">
              {item.date}
            </span>
            <h4 className="font-syne text-[0.95rem] font-bold text-text mt-0.5">
              {item.title}
            </h4>
            <p className="font-mono text-[0.72rem] text-muted mt-0.5">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
