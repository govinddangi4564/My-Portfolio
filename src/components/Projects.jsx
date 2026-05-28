import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

export default function Projects() {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section-container relative z-10 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-accent w-4 h-4" />
          <span className="section-tag m-0 text-accent bg-accent/10 border-accent/20">03. selected work</span>
        </div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="font-mono text-[0.9rem] text-muted -mt-4 max-w-2xl leading-relaxed">
          Real systems, real problems solved — not just tutorial clones. Every architecture decision here was made with scale in mind.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10">
        {displayProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
            className={`w-full h-full ${p.featured ? "md:col-span-2" : ""}`}
          >
            <ProjectCard project={p} featured={p.featured} />
          </motion.div>
        ))}
      </div>

      {projects.length > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="flex justify-center relative z-10"
        >
          <MagneticWrapper magneticStrength={0.15}>
            <a
              href="#all-projects"
              className="inline-flex items-center gap-3 font-mono text-[0.85rem] uppercase tracking-wider px-8 py-4 bg-[var(--surface)] text-text rounded-full border border-[var(--border)] hover:border-accent hover:text-accent hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all duration-500 group overflow-hidden relative"
            >
              {/* Button Inner Sweep Effect */}
              <div className="absolute inset-0 bg-accent/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10 font-bold">Explore All Vaulted Projects</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight size={16} />
              </motion.span>
            </a>
          </MagneticWrapper>
        </motion.div>
      )}
    </section>
  );
}
