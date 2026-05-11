import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const techPills = ['Java', 'Spring Boot', 'React', 'MySQL', 'Python'];

export default function Hero() {
  return (
    <section
      id="hero"
      className="dot-grid-bg relative min-h-[500px] pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,111,240,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,212,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        {/* ── LEFT COLUMN: Text ── */}
        <div className="flex flex-col gap-6">
          {/* Status Badge */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-accent2/25 bg-accent2/5">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse-dot" />
            <span className="font-mono text-[0.65rem] text-accent2/80 tracking-wide">
              Open to opportunities · B.Tech CSE · 2023–2027
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(0.2)} className="font-syne text-[2.8rem] sm:text-[3.5rem] font-extrabold leading-[1.05]">
            <span className="gradient-text">Govind</span>
            <br />
            <span className="gradient-text">Dangi</span>
          </motion.h1>

          {/* Role */}
          <motion.div {...fadeUp(0.3)} className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-[0.9rem] sm:text-[1rem] text-accent font-semibold">
              Full Stack Web Developer
            </span>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.4)} className="font-mono text-[0.8rem] text-muted leading-[1.8] border-l-2 border-dimmed pl-4 max-w-md">
            I build efficient and responsive full-stack web applications — from Java Servlets &amp; Spring Boot backends to clean frontend UIs. Currently sharpening my skills through DSA and exploring scalable architectures.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-wide px-5 py-2.5 bg-accent text-white rounded hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(123,111,240,0.3)] transition-all duration-300"
            >
              View My Work <ArrowDown size={14} />
            </a>
            <a
              href="/govind-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-wide px-5 py-2.5 border border-dimmed text-muted rounded hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_16px_rgba(0,245,212,0.1)] transition-all duration-300"
            >
              <Download size={14} /> Download CV
            </a>
          </motion.div>

          {/* Tech Micro-line */}
          <motion.div {...fadeUp(0.6)} className="flex items-center gap-2 font-mono text-[0.62rem] text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Java · Spring Boot · JSP</span>
            <span className="text-dimmed mx-1">/</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
            <span>React · MySQL · REST APIs</span>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div {...fadeUp(0.7)} className="animate-bounce-slow mt-2">
            <span className="font-mono text-[0.65rem] text-dimmed select-none">↓ scroll to explore</span>
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
          <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-accent/10 ring-outer" />
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-accent2/[0.07] ring-inner" />
            {/* Canvas */}
            <HeroCanvas />
          </div>

          {/* Canvas Label */}
          <span className="font-mono text-[0.6rem] text-dimmed tracking-wider">
            interactive 3d · drag to rotate
          </span>

          {/* Tech Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {techPills.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[0.58rem] px-2.5 py-1 rounded border border-accent/20 bg-accent/5 text-muted"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
