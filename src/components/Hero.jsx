import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import {
  FaJava,
  FaReact,
  FaPython,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { SiSpringboot, SiMysql } from "react-icons/si";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const techPills = [
  { name: "Java", icon: FaJava },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "React", icon: FaReact },
  { name: "MySQL", icon: SiMysql },
  { name: "Python", icon: FaPython },
];

export default function Hero({ theme, lightVisuals = false }) {
  return (
    <section
      id="hero"
      className="dot-grid-bg relative min-h-[500px] pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient Glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--hero-glow-1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--hero-glow-2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        {/* ── LEFT COLUMN: Text ── */}
        <div className="flex flex-col gap-6">
          {/* Status Badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-accent2/60 bg-accent2/15 shadow-[0_0_15px_var(--accent2-soft-glow)] backdrop-blur-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent2 animate-pulse-dot shadow-[0_0_8px_var(--accent2-soft-glow)]" />
            <span className="font-mono text-[0.85rem] text-accent2 font-semibold tracking-wide">
              Open to opportunities | B.Tech CSE | 2023-2027
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-syne text-[clamp(1.4rem,8.3vw,2.8rem)] sm:text-[3.5rem] font-extrabold leading-[1.05] tracking-[-0.02em] whitespace-nowrap max-w-full"
          >
            <span className="gradient-text">Govind</span>{" "}
            <span className="gradient-text">Dangi</span>
          </motion.h1>

          {/* Role */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-3">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-[1.1rem] sm:text-[1.2rem] text-accent font-semibold">
              Java Full Stack Developer | Software Engineer
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.4)}
            className="font-mono text-[1rem] text-muted leading-[1.8] border-l-2 border-dimmed pl-4 max-w-md"
          >
            I build scalable web applications and backend systems - from Java Servlets &amp; Spring Boot to clean React frontend UIs. Seeking Software Engineer and Java Developer roles, while sharpening my skills in Data Structures and Algorithms.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-[0.85rem] uppercase tracking-wide px-5 py-2.5 bg-accent text-[var(--on-accent)] rounded hover:-translate-y-0.5 hover:shadow-[0_6px_24px_var(--card-hover-glow)] transition-all duration-300"
            >
              View My Work <ArrowDown size={14} />
            </a>
            <a
              href="/govind-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.85rem] uppercase tracking-wide px-5 py-2.5 border border-dimmed text-muted rounded hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_16px_var(--accent2-soft-glow)] transition-all duration-300"
            >
              <Download size={14} /> Download CV
            </a>
            <div className="flex gap-2">
              <a
                href="https://github.com/govinddangi4564"
                target="_blank"
                rel="noopener noreferrer me"
                className="p-2.5 rounded border border-dimmed text-muted hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_12px_var(--accent2-soft-glow)] transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/govinddangi4564/"
                target="_blank"
                rel="noopener noreferrer me"
                className="p-2.5 rounded border border-dimmed text-muted hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_12px_var(--accent2-soft-glow)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/govind_dangiii/"
                target="_blank"
                rel="noopener noreferrer me"
                className="p-2.5 rounded border border-dimmed text-muted hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_12px_var(--accent2-soft-glow)] transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.threads.net/@govind_dangiii"
                target="_blank"
                rel="noopener noreferrer me"
                className="p-2.5 rounded border border-dimmed text-muted hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_12px_var(--accent2-soft-glow)] transition-all duration-300"
                aria-label="Threads"
              >
                <FaThreads size={18} />
              </a>
            </div>
          </motion.div>

          {/* Tech Micro-line */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex items-center gap-2 font-mono text-[0.75rem] text-muted"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Java · Spring Boot · JSP</span>
            <span className="text-dimmed mx-1">/</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
            <span>React · MySQL · REST APIs</span>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div {...fadeUp(0.7)} className="animate-bounce-slow mt-2">
            <span className="font-mono text-[0.75rem] text-dimmed select-none">
              ↓ scroll to explore
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Rotating Rings */}
          <div className="relative w-[340px] h-[340px] max-w-[92vw] max-h-[92vw] sm:w-[410px] sm:h-[410px] lg:w-[460px] lg:h-[460px] flex items-center justify-center">
            <HeroCanvas theme={theme} lightMode={lightVisuals} />
          </div>

          {/* Canvas Label */}
          <span className="font-mono text-[0.6rem] text-dimmed tracking-wider">
            interactive 3d · drag to rotate
          </span>

          {/* Tech Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {techPills.map((pill) => (
              <span
                key={pill.name}
                className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] px-2.5 py-1 rounded border border-accent/20 bg-accent/5 text-muted"
              >
                <pill.icon size={12} className="text-accent" />
                {pill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
