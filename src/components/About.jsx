import { useState } from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import SectionParallax from './SectionParallax';
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
        <span className="section-tag">01. about me</span>
        <h2 className="section-title">The Engineer & Architecture</h2>
      </motion.div>

      {/* TOP ROW — 3D Profile & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-center mb-6 sm:mb-12">
        {/* Hologram Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-[170px] h-[220px] sm:w-[240px] sm:h-[310px] mx-auto rounded-2xl border border-accent/40 bg-surface/80 overflow-hidden shadow-[0_0_35px_var(--photo-glow)] group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent2/15 to-transparent h-[200%] -top-[100%] group-hover:animate-[scan_2.5s_linear_infinite] z-20 pointer-events-none" />

          <img
            src="/profile.jpg"
            alt="Govind Dangi"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9] contrast-110 saturate-75 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500 z-10"
          />

          <div className="hidden absolute inset-0 bg-surface items-center justify-center text-accent/50 font-mono text-[0.68rem] text-center px-4 border border-dashed border-accent/20 rounded-2xl z-0">
            Govind Dangi
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30 bg-black/70 px-2.5 py-1.5 rounded-xl border border-[var(--border)]">
            <div className="flex items-center gap-1 text-emerald-400 font-mono text-[0.6rem] sm:text-[0.65rem] font-bold">
              <CheckCircle2 size={11} />
              <span>Verified Developer</span>
            </div>
            <div className="text-text font-syne text-[0.72rem] sm:text-[0.78rem] font-bold">Govind Dangi</div>
          </div>
        </motion.div>

        {/* Bio Bento Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bento-card p-4 sm:p-8 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Code2 size={15} className="text-accent2" />
            <span className="font-mono text-[0.68rem] sm:text-[0.72rem] uppercase tracking-widest text-accent2 font-semibold">
              Software Engineering Profile
            </span>
          </div>

          <p className="font-body text-[0.88rem] sm:text-[1rem] text-muted leading-relaxed mb-3">
            I am a Software Engineer and Java Full Stack Developer pursuing B.Tech in Computer Science & Engineering (2023–2027). I specialize in designing and engineering end-to-end applications — from clean database relational schemas and robust Java backend APIs to fluid client-side interfaces.
          </p>

          <p className="font-body text-[0.82rem] sm:text-[0.95rem] text-dimmed leading-relaxed mb-4">
            Whether implementing multi-factor authentication systems, training sentence-transformers for resume screening algorithms, or solving complex DSA problems, I prioritize <span className="text-text font-medium">maintainability, security, and computational efficiency</span>.
          </p>

          {/* Quick Principle Selector Tabs */}
          <div className="pt-3 border-t border-[var(--border)]">
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-dimmed block mb-2">
              Core Engineering Focus:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {principles.map((p) => {
                const isSelected = activePrinciple === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePrinciple(p.id)}
                    type="button"
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl font-mono text-[0.65rem] sm:text-[0.7rem] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-accent text-white shadow-[0_0_12px_var(--card-hover-glow)]'
                        : 'bg-surface/80 border border-[var(--border)] text-muted hover:text-text hover:border-accent/40'
                    }`}
                  >
                    <p.icon size={12} />
                    <span>{p.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Principle Details */}
            <div className="mt-3 p-3 sm:p-4 rounded-xl bg-surface/50 border border-[var(--border)] flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-2">
                <currentPrinciple.icon size={15} className="text-accent2" />
                <span className="font-syne text-[0.82rem] sm:text-[0.88rem] font-bold text-text">
                  {currentPrinciple.title}
                </span>
              </div>
              <p className="font-body text-[0.78rem] sm:text-[0.85rem] text-muted leading-normal">
                {currentPrinciple.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {currentPrinciple.points.map((pt) => (
                  <span key={pt} className="cyber-badge text-[0.58rem] sm:text-[0.62rem] py-0.5 px-2">
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* INTERACTIVE ARCHITECTURE BLUEPRINT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bento-card p-4 sm:p-8 mb-8 sm:mb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-accent sm:w-[18px] sm:h-[18px]" />
            <h3 className="font-syne text-[1rem] sm:text-[1.15rem] font-bold text-text">
              System Architecture & Delivery Pipeline
            </h3>
          </div>
          <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-accent2 bg-accent2/10 border border-accent2/25 px-2.5 py-0.5 rounded-full self-start">
            Standard Delivery Stack
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {archPipeline.map((node, i) => (
            <div key={node.step} className="arch-node p-2.5 sm:p-3.5 group">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-accent font-bold">
                  STEP {node.step}
                </span>
                {i < archPipeline.length - 1 && (
                  <span className="hidden lg:inline font-mono text-[0.7rem] text-dimmed group-hover:text-accent2 transition-colors">
                    →
                  </span>
                )}
              </div>
              <h4 className="font-syne text-[0.85rem] sm:text-[0.95rem] font-bold text-text mb-0.5 truncate">
                {node.title}
              </h4>
              <div className="font-mono text-[0.65rem] sm:text-[0.72rem] text-accent2 mb-1 font-medium truncate">
                {node.tech}
              </div>
              <p className="font-body text-[0.72rem] sm:text-[0.78rem] text-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BOTTOM ROW — Timeline & Milestones */}
      <div className="grid grid-cols-1 gap-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-accent2" />
          <h3 className="font-syne text-[1.2rem] font-bold text-text">
            Education & Journey Milestones
          </h3>
        </div>
        <Timeline />
      </div>
    </SectionParallax>
  );
}

