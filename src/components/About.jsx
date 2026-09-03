import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionParallax from './SectionParallax';
import ArchitectureSimulator from './ArchitectureSimulator';
import { ShieldCheck, Database, Layers, Sparkles, CheckCircle2, Code2, Server, Globe } from 'lucide-react';

const principles = [
  {
    id: 'backend',
    title: 'Java Backend Core',
    icon: Server,
    desc: 'Deep architecture in Java, Spring Boot, Servlets, and Hibernate. Engineering modular APIs, session management, and scalable services.',
    points: ['RESTful API Design', 'Spring Data JPA & Hibernate', 'Multi-tier MVC Architecture'],
  },
  {
    id: 'database',
    title: 'ACID Data Layer',
    icon: Database,
    desc: 'Relational schema design in MySQL & PostgreSQL. Emphasizing transactional integrity, optimized indexes, and normalized tables.',
    points: ['Normalized Schema Design', 'JDBC Transaction Boundaries', 'Query Performance Tuning'],
  },
  {
    id: 'security',
    title: 'Security & Auth',
    icon: ShieldCheck,
    desc: 'Zero-trust defensive engineering: BCrypt password hashing, session tokens, and 2FA OTP authentication pipelines.',
    points: ['BCrypt Cryptographic Hashing', 'OTP-based 2FA Verification', 'Role-Based Access Control (RBAC)'],
  },
  {
    id: 'frontend',
    title: 'Full-Stack Integration',
    icon: Globe,
    desc: 'Connecting enterprise backend systems with responsive React UIs, dynamic state management, and low-latency client rendering.',
    points: ['React & Component Architecture', 'Tailwind & Modern CSS', 'Seamless REST Consumption'],
  },
];

const archPipeline = [
  { step: '01', title: 'Data Tier', tech: 'MySQL / PostgreSQL', desc: 'Normalized tables, ACID transactions & foreign keys' },
  { step: '02', title: 'Service Tier', tech: 'Java / Spring Boot', desc: 'Business logic, validation & security filtering' },
  { step: '03', title: 'API Gateway', tech: 'RESTful Endpoints', desc: 'JSON payloads, status codes & CORS handling' },
  { step: '04', title: 'Client Tier', tech: 'React / Webpack', desc: 'Interactive SPA, responsive layouts & 3D WebGL' },
];

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState('backend');

  const currentPrinciple = principles.find((p) => p.id === activePrinciple) || principles[0];

  return (
    <SectionParallax id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="font-mono text-[0.74rem] uppercase tracking-widest text-rose-300 font-semibold">
            01. about me
          </span>
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Govind Dangi
        </h2>
      </motion.div>

      {/* 2-COLUMN EDITORIAL GRID */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-[1fr_2fr] items-start mb-10 sm:mb-16">
        {/* LEFT COLUMN: Approach & Photo Card */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-white"
          >
            <div className="font-semibold text-lg sm:text-xl">My approach to the work is</div>
            <div className="font-serif font-normal italic text-xl sm:text-2xl text-rose-300">
              logic, consistency, and rationality
            </div>
          </motion.div>

          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[260px] aspect-[4/5] mx-auto md:mx-0 rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-lg group"
          >
            <img
              src="/profile.jpg"
              alt="Govind Dangi"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.95] contrast-105 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 z-10"
            />

            <div className="hidden absolute inset-0 bg-zinc-900 items-center justify-center text-zinc-400 font-mono text-[0.68rem] text-center px-4 border border-dashed border-zinc-700 rounded-2xl z-0">
              Govind Dangi
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30 bg-black/85 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[0.6rem] sm:text-[0.65rem] font-bold">
                <CheckCircle2 size={11} />
                <span>Verified Developer</span>
              </div>
              <div className="text-white font-syne text-[0.75rem] sm:text-[0.82rem] font-bold">Govind Dangi · SDE</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Bio Narrative + Socials + Principles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="font-body text-[0.95rem] sm:text-[1.05rem] text-zinc-300 leading-relaxed space-y-4">
            <p>
              I&apos;m <span className="text-white font-semibold">Govind Dangi</span>, a Software Engineer &amp; Java Full Stack Developer pursuing B.Tech in Computer Science &amp; Engineering (2023–2027) at Prestige Institute of Engineering Management &amp; Research, Indore.
            </p>
            <p className="text-zinc-400 text-[0.9rem] sm:text-[0.98rem]">
              I specialize in designing and architecting robust software systems — from normalized ACID-compliant relational schemas and secure multi-tier Java / Spring Boot APIs to responsive React user interfaces. In every project, research and understanding system constraints come first before writing clean, performant code.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {[
              { href: "https://github.com/govinddangi4564", label: "GitHub" },
              { href: "https://www.linkedin.com/in/govinddangi4564/", label: "LinkedIn" },
              { href: "https://www.threads.net/@govind_dangiii", label: "Threads" },
              { href: "/govind-resume.pdf", label: "Resume PDF" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 font-mono text-[0.72rem] sm:text-[0.76rem] font-semibold hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all"
              >
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Quick Principle Selector Tabs */}
          <div className="pt-4 border-t border-zinc-800">
            <span className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-zinc-400 block mb-2.5 font-semibold">
              Core Engineering Specializations:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {principles.map((p) => {
                const isSelected = activePrinciple === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePrinciple(p.id)}
                    type="button"
                    className={`px-3 py-2 rounded-xl font-mono text-[0.68rem] sm:text-[0.74rem] font-semibold transition-all flex items-center justify-center gap-1.5 ${isSelected
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                  >
                    <p.icon size={13} />
                    <span>{p.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Principle Details */}
            <div className="mt-3 p-4 sm:p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <currentPrinciple.icon size={16} className="text-white" />
                <span className="font-syne text-[0.88rem] sm:text-[0.95rem] font-bold text-white">
                  {currentPrinciple.title}
                </span>
              </div>
              <p className="font-body text-[0.82rem] sm:text-[0.88rem] text-zinc-400 leading-normal">
                {currentPrinciple.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {currentPrinciple.points.map((pt) => (
                  <span key={pt} className="text-[0.6rem] sm:text-[0.65rem] py-0.5 px-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* INTERACTIVE SYSTEM & ACID TRANSACTION SIMULATOR */}
      <ArchitectureSimulator />

      {/* INTERACTIVE ARCHITECTURE BLUEPRINT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-5 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 sm:mb-6">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-zinc-300" />
            <h3 className="font-syne text-[1.05rem] sm:text-[1.2rem] font-bold text-white">
              System Architecture &amp; Delivery Pipeline
            </h3>
          </div>
          <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-300 bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full self-start font-semibold">
            Standard Production Stack
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {archPipeline.map((node, i) => (
            <div key={node.step} className="p-3.5 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 group hover:border-zinc-700 transition-all">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-400 font-bold">
                  STEP {node.step}
                </span>
                {i < archPipeline.length - 1 && (
                  <span className="hidden lg:inline font-mono text-[0.75rem] text-zinc-600 group-hover:text-zinc-300 transition-colors">
                    →
                  </span>
                )}
              </div>
              <h4 className="font-syne text-[0.88rem] sm:text-[0.98rem] font-bold text-white mb-0.5 truncate">
                {node.title}
              </h4>
              <div className="font-mono text-[0.65rem] sm:text-[0.72rem] text-zinc-400 mb-1 font-medium truncate">
                {node.tech}
              </div>
              <p className="font-body text-[0.74rem] sm:text-[0.8rem] text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionParallax>
  );
}

