import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import MagneticWrapper from "./MagneticWrapper";

export default function AllProjectsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10 overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12"
        >
          <MagneticWrapper magneticStrength={0.2} className="inline-block">
            <a
              href="#"
              className="inline-flex items-center gap-3 font-mono text-[0.85rem] uppercase tracking-wider text-muted hover:text-white group transition-colors bg-[var(--surface)] px-6 py-3 rounded-full border border-[var(--border)] shadow-sm hover:border-white/40"
            >
              <span className="group-hover:-translate-x-1.5 transition-transform duration-300">
                <ArrowLeft size={16} />
              </span>
              Back to Terminal
            </a>
          </MagneticWrapper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
            <span className="font-mono text-[0.72rem] uppercase tracking-widest text-brand-pink font-semibold">archive · all systems</span>
          </div>
          <h1 className="font-syne text-[3rem] md:text-[4rem] font-bold text-white mb-4 leading-tight tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-purple-300 to-cyan-300">Vault.</span>
          </h1>
          <p className="font-mono text-[0.95rem] text-zinc-400 max-w-2xl leading-relaxed">
            A complete historical record of the systems, microservices, frontends, and side-quests I&apos;ve built. Everything from AI models to gamified platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 + i * 0.1 }}
              className={`w-full h-full ${p.featured ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={p} featured={p.featured} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
