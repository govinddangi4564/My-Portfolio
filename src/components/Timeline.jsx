import { motion } from "framer-motion";
import { GraduationCap, Award, Cloud, CheckCircle2, Calendar } from "lucide-react";

const milestones = [
  {
    date: "2023 — 2027",
    status: "In Progress",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Prestige Institute of Engineering Management & Research (PIEMR), Indore",
    highlights: ["Data Structures & Algorithms", "Object-Oriented Programming (Java)", "Database Management Systems", "Computer Networks & OS"],
    icon: GraduationCap,
    accent: "text-zinc-200 border-zinc-700/80 bg-zinc-900/60",
  },
  {
    date: "2024",
    status: "Completed",
    title: "Google Cloud Platform (GCP) Codelabs & Workshop",
    institution: "Hands-on Technical Cloud Training",
    highlights: ["Cloud Architecture Foundations", "Compute Engine & Storage", "API Deployment & Scaling"],
    icon: Cloud,
    accent: "text-zinc-300 border-zinc-700/80 bg-zinc-900/60",
  },
  {
    date: "2022",
    status: "82.40% Score",
    title: "Higher Secondary Certificate (12th Grade · PCM)",
    institution: "Saraswati Shishu Mandir Higher Secondary School",
    highlights: ["Physics, Chemistry, Mathematics Focus", "Analytical Problem Solving Foundations"],
    icon: Award,
    accent: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  {
    date: "2020",
    status: "90.75% Distinction",
    title: "Secondary School Certificate (10th Grade)",
    institution: "Saraswati Shishu Mandir High School",
    highlights: ["Academic Merit Distinction", "Top Tier Mathematics & Science Performance"],
    icon: Award,
    accent: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  },
];

export default function Timeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {milestones.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between group hover:border-zinc-700 transition-all cursor-default shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${item.accent}`}>
                  <item.icon size={15} />
                </div>
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-500 flex items-center gap-1">
                  <Calendar size={11} /> {item.date}
                </span>
              </div>
              <span className={`font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${item.accent}`}>
                {item.status}
              </span>
            </div>

            <h4 className="font-syne text-[0.95rem] sm:text-[1.05rem] font-bold text-white mb-1 group-hover:text-brand-pink transition-colors">
              {item.title}
            </h4>
            <p className="font-body text-[0.78rem] sm:text-[0.84rem] text-zinc-400 mb-3">
              {item.institution}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
            {item.highlights.map((hl) => (
              <span
                key={hl}
                className="inline-flex items-center gap-1 font-mono text-[0.58rem] sm:text-[0.62rem] px-2.5 py-0.8 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-400"
              >
                <CheckCircle2 size={10} className="text-zinc-500" />
                {hl}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

