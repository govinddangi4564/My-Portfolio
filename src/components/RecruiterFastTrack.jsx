import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { sound } from '../utils/sound';

export default function RecruiterFastTrack({ isOpen, onClose }) {
  const [copiedType, setCopiedType] = useState(null);

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    sound.playSuccess();
    setTimeout(() => setCopiedType(null), 2000);
  };

  const roleMatches = [
    { role: 'Java Backend Engineer', match: '99%', focus: 'Spring Boot, REST APIs, JPA, MySQL, ACID, Multithreading' },
    { role: 'Full Stack Developer', match: '96%', focus: 'Java + Spring Boot Backend + React Frontend + Responsive UI' },
    { role: 'Software Engineer (Fresher / SDE-1)', match: '100%', focus: 'Strong DSA, OOP Principles, Relational Databases, Clean Architecture' },
    { role: 'AI & Systems Integrator', match: '92%', focus: 'Sentence-BERT NLP, Gemini API Integration, Microservices' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-[#090c14] rounded-3xl border border-emerald-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(16,185,129,0.15)] overflow-hidden font-mono text-text p-5 sm:p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface border border-[var(--border)] text-muted hover:text-white hover:border-emerald-500/40 transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-black flex items-center justify-center font-bold text-sm shadow-md">
                <Briefcase size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-syne text-[1.2rem] font-bold text-text">Recruiter Quick Scorecard</span>
                  <span className="font-mono text-[0.62rem] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                    ACTIVE SDE APPLICANT
                  </span>
                </div>
                <p className="font-mono text-[0.68rem] text-dimmed">
                  Govind Dangi · B.Tech CSE (PIEMR Indore) · Available for Full-Time Roles
                </p>
              </div>
            </div>

            {/* Role Match Matrix */}
            <div className="mb-5">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-emerald-400 font-bold block mb-2">
                Target Role Alignment Matrix:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roleMatches.map((item) => (
                  <div key={item.role} className="p-3 rounded-xl bg-surface/70 border border-[var(--border)] flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-syne text-[0.82rem] font-bold text-text truncate">{item.role}</span>
                      <span className="font-mono text-[0.72rem] font-bold text-emerald-400 shrink-0">{item.match}</span>
                    </div>
                    <span className="font-body text-[0.68rem] text-dimmed leading-tight">{item.focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Production Proofs */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="p-2.5 rounded-xl bg-surface/50 border border-[var(--border)] text-center">
                <ShieldCheck size={16} className="text-emerald-400 mx-auto mb-1" />
                <span className="font-syne text-[0.88rem] font-bold block text-text">100% ACID</span>
                <span className="font-mono text-[0.58rem] text-dimmed block">Zero Partial Writes</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/50 border border-[var(--border)] text-center">
                <Award size={16} className="text-amber-400 mx-auto mb-1" />
                <span className="font-syne text-[0.88rem] font-bold block text-text">90.75% Merit</span>
                <span className="font-mono text-[0.58rem] text-dimmed block">Class 10th Distinction</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/50 border border-[var(--border)] text-center">
                <Zap size={16} className="text-cyan-400 mx-auto mb-1" />
                <span className="font-syne text-[0.88rem] font-bold block text-text">Sentence-BERT</span>
                <span className="font-mono text-[0.58rem] text-dimmed block">Semantic Matching</span>
              </div>
            </div>

            {/* Direct Action Line for Recruiters */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="font-syne text-[0.88rem] font-bold text-text block">Initiate Interview / Contact</span>
                <span className="font-mono text-[0.68rem] text-dimmed block">Direct line with candidate:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <a
                  href="/govind-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white text-black font-bold font-mono text-[0.72rem] hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <Download size={13} /> Resume PDF
                </a>

                <button
                  onClick={() => copy('govinddangi585@gmail.com', 'email')}
                  type="button"
                  className="px-3 py-2 rounded-xl bg-surface border border-[var(--border)] text-muted hover:text-white hover:border-emerald-500/40 font-mono text-[0.72rem] transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedType === 'email' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedType === 'email' ? 'Copied' : 'Email'}</span>
                </button>

                <button
                  onClick={() => copy('+917067624564', 'phone')}
                  type="button"
                  className="px-3 py-2 rounded-xl bg-surface border border-[var(--border)] text-muted hover:text-white hover:border-emerald-500/40 font-mono text-[0.72rem] transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedType === 'phone' ? <Check size={13} className="text-emerald-400" /> : <Phone size={13} />}
                  <span>{copiedType === 'phone' ? 'Copied' : 'Call'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
