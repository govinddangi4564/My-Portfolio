import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import {
  FaJava,
  FaReact,
  FaPython,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { SiSpringboot, SiMysql } from "react-icons/si";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
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
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
        {/* LEFT: Text content */}
        <div className="flex flex-col gap-6 lg:gap-7 relative z-10">
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full glass-panel"
          >
            <Sparkles size={14} className="text-accent2" />
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse-dot shadow-[0_0_8px_var(--accent2-soft-glow)]" />
            <span className="font-mono text-[0.78rem] text-muted font-medium tracking-wide">
              Open to opportunities · B.Tech CSE · 2023–2027
            </span>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-accent mb-3 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent"></span>
              Java Full Stack Developer | Software Engineer
            </p>
            <h1 className="font-syne text-[clamp(2.4rem,9vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
              <span className="hero-gradient-text">Govind</span>
              <br />
              <span className="hero-gradient-text">Dangi</span>
            </h1>
          </motion.div>

          <motion.div
            {...fadeUp(0.35)}
            className="pl-5 border-l-2 border-accent/40 font-body text-[1.05rem] text-muted leading-relaxed max-w-lg"
          >
            I build scalable web applications and backend systems - from{" "}
            <span className="text-text font-medium">Java Servlets & Spring Boot</span> to clean{" "}
            <span className="text-text font-medium">React</span> frontend UIs. Seeking Software Engineer and Java Developer roles, while sharpening my skills in Data Structures and Algorithms.
          </motion.div>

          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="btn-glow inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-wider px-6 py-3 text-[var(--on-accent)] rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--card-hover-glow)] transition-all duration-300"
            >
              View Work <ArrowDown size={14} />
            </a>
            <a
              href="/govind-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-wider px-6 py-3 glass-panel text-muted rounded-full hover:text-accent2 hover:border-accent2/40 transition-all duration-300"
            >
              <Download size={14} /> Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.55)} className="flex gap-2.5">
            {[
              { href: "https://github.com/govinddangi4564", icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/govinddangi4564/", icon: FaLinkedin, label: "LinkedIn" },
              { href: "https://www.threads.net/@govind_dangiii", icon: FaThreads, label: "Threads" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="p-3 rounded-full glass-panel text-muted hover:text-accent2 hover:scale-110 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={17} />
              </a>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.65)}
            className="flex flex-wrap gap-2 pt-2"
          >
            {techPills.map((pill) => (
              <span
                key={pill.name}
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] px-3 py-1.5 rounded-full glass-panel text-muted"
              >
                <pill.icon size={11} className="text-accent" />
                {pill.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center relative z-10"
        >
          <div className="relative w-full max-w-[520px] aspect-square">
            <div className="absolute inset-[-20%] rounded-full bg-gradient-to-br from-accent/20 via-transparent to-accent2/15 blur-3xl pointer-events-none" />
            <div className="relative w-full h-full">
              <HeroCanvas theme={theme} lightMode={lightVisuals} />
            </div>
          </div>
          <span className="font-mono text-[0.65rem] text-dimmed tracking-[0.15em] uppercase mt-4">
            Interactive 3D · Drag to explore
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.65rem] text-dimmed tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
