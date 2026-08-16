import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles, Copy, Check, Terminal, MapPin } from "lucide-react";
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
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const ROLES = [
  "Java Full Stack Developer",
  "Backend & Systems Engineer",
  "Spring Boot & Cloud Architect",
  "DSA & Problem Solver",
];

const highlights = [
  { text: "6+ Systems Built", href: "#projects", color: "text-accent border-accent/30" },
  { text: "100% ACID DB Integrity", href: "#about", color: "text-emerald-400 border-emerald-400/30" },
  { text: "2FA Security", href: "#projects", color: "text-accent2 border-accent2/30" },
  { text: "Sentence-BERT NLP", href: "#projects", color: "text-amber-400 border-amber-400/30" },
];

const techPills = [
  { name: "Java", icon: FaJava, color: "text-[#007396]" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-[#6DB33F]" },
  { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
  { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
];


export default function Hero({ theme, lightVisuals = false }) {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("govinddangi585@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-20 sm:pt-28 pb-10 sm:pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-6 items-center">
        {/* LEFT: Text content & Engineer Spec */}
        <div className="flex flex-col gap-3.5 sm:gap-5 relative z-10">
          
          {/* Status HUD Pill */}
          <motion.div
            {...fadeUp(0.08)}
            className="flex flex-wrap items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-surface/80 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-wide">
                Available for Software Engineer Roles
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-surface/60 border border-[var(--border)] font-mono text-[0.65rem] sm:text-[0.7rem] text-dimmed">
              <MapPin size={11} className="text-accent" />
              <span>Indore, IN · B.Tech CSE</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div {...fadeUp(0.18)}>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-5 sm:w-7 h-[2px] bg-gradient-to-r from-accent to-accent2 rounded-full"></span>
              <span className="font-mono text-[0.72rem] sm:text-[0.78rem] uppercase tracking-[0.18em] text-accent font-semibold">
                {ROLES[roleIndex]}
              </span>
            </div>
            
            <h1 className="font-syne text-[clamp(2.3rem,8vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-text">
              <span className="hero-gradient-text">Govind</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent2 to-emerald-400">
                Dangi
              </span>
            </h1>
            
            <p className="font-syne text-[clamp(1.05rem,2.8vw,1.8rem)] font-bold text-text/90 mt-1.5 sm:mt-2.5 tracking-tight leading-snug">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent2 to-emerald-400">Scalable</span> Backend &amp; Full Stack Systems.
            </p>
          </motion.div>

          {/* Interactive Feature Chips */}
          <motion.div {...fadeUp(0.24)} className="flex flex-wrap gap-1.5 sm:gap-2">
            {highlights.map((h) => (
              <a
                key={h.text}
                href={h.href}
                className={`font-mono text-[0.62rem] sm:text-[0.68rem] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-surface/60 border ${h.color} hover:scale-105 transition-all flex items-center gap-1.5`}
              >
                <Sparkles size={10} />
                <span>{h.text}</span>
              </a>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            {...fadeUp(0.32)}
            className="pl-3.5 sm:pl-5 border-l-2 border-accent/40 font-body text-[0.88rem] sm:text-[1.02rem] text-muted leading-relaxed max-w-xl"
          >
            I architect robust server-side architectures, ACID-compliant databases, and clean user interfaces. Specializing in{" "}
            <span className="text-text font-semibold">Java, Spring Boot, React, and MySQL</span>, with practical experience building NLP semantic screening systems and secure multi-tier enterprise apps.
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            {...fadeUp(0.42)}
            className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1"
          >
            <a
              href="#projects"
              className="btn-glow inline-flex items-center gap-2 font-mono text-[0.74rem] sm:text-[0.8rem] uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3.5 text-[var(--on-accent)] rounded-full hover:-translate-y-0.5 transition-all duration-300 font-semibold"
            >
              Explore Work <ArrowDown size={13} />
            </a>

            <a
              href="/govind-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[0.74rem] sm:text-[0.8rem] uppercase tracking-wider px-3.5 sm:px-5 py-2.5 sm:py-3.5 glass-panel text-text rounded-full hover:text-accent2 hover:border-accent2/50 transition-all duration-300 font-medium"
            >
              <Download size={13} className="text-accent2" /> Resume
            </a>

            <button
              onClick={copyEmail}
              type="button"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[0.72rem] sm:text-[0.78rem] px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-full border border-[var(--border)] bg-surface/60 text-muted hover:text-text hover:border-accent/40 transition-all duration-300 group"
              title="Copy Email to Clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[160px] sm:max-w-none">govinddangi585@gmail.com</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Socials & Tech Pills */}
          <motion.div {...fadeUp(0.52)} className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <div className="flex gap-1.5 sm:gap-2">
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
                  className="p-2 sm:p-2.5 rounded-full glass-panel text-muted hover:text-accent2 hover:border-accent2/40 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-[var(--border)] mx-1 hidden sm:block" />

            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {techPills.map((pill) => (
                <span
                  key={pill.name}
                  className="inline-flex items-center gap-1 font-mono text-[0.62rem] sm:text-[0.68rem] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-surface/70 border border-[var(--border)] text-muted hover:text-text hover:border-accent/40 transition-colors"
                >
                  <pill.icon size={11} className={pill.color} />
                  <span>{pill.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Interactive 3D Canvas with Hologram Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center relative z-10 w-full"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[440px] aspect-square">
            <div className="absolute inset-[-15%] rounded-full bg-gradient-to-br from-accent/20 via-accent2/10 to-transparent blur-3xl pointer-events-none" />
            
            {/* Interactive Terminal Badge overlay */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 border border-[var(--border)] font-mono text-[0.58rem] sm:text-[0.62rem] text-accent2 shadow-lg">
                <Terminal size={10} className="text-accent" />
                <span>GovindCore::Active</span>
              </div>
            </div>

            <div className="relative w-full h-full">
              <HeroCanvas theme={theme} lightMode={lightVisuals} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2.5 sm:mt-4 font-mono text-[0.62rem] sm:text-[0.68rem] text-dimmed tracking-wider uppercase">
            <Sparkles size={11} className="text-accent2 animate-pulse" />
            <span>Interactive 3D Reactor · Drag / Rotate</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[0.62rem] text-dimmed tracking-widest uppercase">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent via-accent2 to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
}

