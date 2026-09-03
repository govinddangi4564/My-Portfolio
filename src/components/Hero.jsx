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
  { text: "6+ Systems Built", href: "#projects", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { text: "100% ACID DB Integrity", href: "#about", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  { text: "2FA Security", href: "#projects", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { text: "Sentence-BERT NLP", href: "#projects", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
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
    <section className="relative flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center relative z-10">
        {/* LEFT: Core Identity & Recruiter Pitch */}
        <div className="flex flex-col gap-5 sm:gap-7 text-left">
          {/* Status & Location Pill */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 font-mono text-[0.68rem] sm:text-[0.74rem] text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-medium">Available for Software Engineer Roles</span>
              <span className="text-zinc-600 hidden sm:inline">·</span>
              <span className="text-zinc-400 hidden sm:inline flex items-center gap-1">
                <MapPin size={11} className="text-brand-pink" /> Indore, India
              </span>
            </div>
          </motion.div>

          {/* Heading & Identity */}
          <motion.div {...fadeUp(0.18)}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-[0.74rem] sm:text-[0.82rem] text-rose-300 font-bold mb-3.5 shadow-sm">
              <Terminal size={13} className="text-rose-400" />
              <span>System.out.println(&quot;Hi, I&apos;m Govind Dangi&quot;);</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-[2.75rem] lg:text-[3.35rem] leading-[1.14] font-bold text-white tracking-tight">
              I architect &amp; build scalable systems, that solve your{" "}
              <span className="text-rose-300">engineering challenges</span>
            </h1>

            <div className="flex items-center gap-2.5 mt-4">
              <span className="w-6 h-[2px] bg-rose-400 rounded-full"></span>
              <span className="font-mono text-[0.72rem] sm:text-[0.8rem] uppercase tracking-[0.16em] text-rose-300 font-bold">
                {ROLES[roleIndex]}
              </span>
            </div>
          </motion.div>

          {/* Feature Chips */}
          <motion.div {...fadeUp(0.24)} className="flex flex-wrap gap-1.5 sm:gap-2">
            {highlights.map((h) => (
              <a
                key={h.text}
                href={h.href}
                className="font-mono text-[0.62rem] sm:text-[0.68rem] px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles size={10} className="text-zinc-400" />
                <span>{h.text}</span>
              </a>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            {...fadeUp(0.32)}
            className="pl-4 sm:pl-5 border-l-2 border-white/20 font-body text-[0.9rem] sm:text-[1.05rem] text-zinc-400 leading-relaxed max-w-xl"
          >
            Hello, I&apos;m <span className="text-white font-medium">Govind Dangi</span>, a Software Engineer &amp; Full Stack Developer with practical experience in{" "}
            <span className="text-white font-semibold">Java, Spring Boot, React, and MySQL</span>, architecting NLP semantic screening systems and robust, multi-tier enterprise web applications.
          </motion.div>

          {/* Minimalist High-Contrast CTAs */}
          <motion.div
            {...fadeUp(0.42)}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            {/* Primary Action Button (Clean White Pill) */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-black font-mono text-[0.74rem] sm:text-[0.8rem] uppercase font-bold tracking-wider hover:bg-zinc-200 transition-all shadow-md group"
            >
              <span>Explore Work</span>
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* Resume Button */}
            <a
              href="/govind-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/90 px-4 sm:px-5 py-2.5 sm:py-3 text-white font-mono text-[0.74rem] sm:text-[0.8rem] uppercase font-bold tracking-wider hover:bg-zinc-800 hover:border-zinc-600 transition-all"
            >
              <Download size={13} className="text-zinc-400" />
              <span>Resume</span>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={copyEmail}
              type="button"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] sm:text-[0.78rem] px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all group"
              title="Copy Email to Clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="truncate max-w-[160px] sm:max-w-none">govinddangi585@gmail.com</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Socials & Tech Pills */}
          <motion.div {...fadeUp(0.52)} className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <div className="flex gap-2">
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
                  className="group cursor-pointer rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple p-[1px] hover:scale-[1.04] transition-all"
                  aria-label={social.label}
                >
                  <div className="p-2 sm:p-2.5 rounded-[7px] bg-zinc-950 text-zinc-400 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-purple transition-all">
                    <social.icon size={15} />
                  </div>
                </a>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

            <div className="flex flex-wrap gap-1.5">
              {techPills.map((pill) => (
                <span
                  key={pill.name}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] sm:text-[0.68rem] px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
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
            <div className="absolute inset-[-15%] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />

            {/* Interactive Terminal Badge overlay */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 border border-[var(--border)] font-mono text-[0.58rem] sm:text-[0.62rem] text-zinc-300 shadow-lg">
                <Terminal size={10} className="text-cyan-400" />
                <span>GovindCore::Active</span>
              </div>
            </div>

            <div className="relative w-full h-full">
              <HeroCanvas theme={theme} lightMode={lightVisuals} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2.5 sm:mt-4 font-mono text-[0.62rem] sm:text-[0.68rem] text-dimmed tracking-wider uppercase">
            <Sparkles size={11} className="text-emerald-400 animate-pulse" />
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
        <div className="w-[1px] h-8 bg-gradient-to-b from-emerald-400 via-cyan-400 to-transparent animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
