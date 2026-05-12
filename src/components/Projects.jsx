import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">03. selected work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="font-mono text-[0.78rem] text-muted -mt-4 mb-8">
          Real systems, real problems solved — not just tutorial clones.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {displayProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={p.featured ? "md:col-span-2" : ""}
          >
            <ProjectCard project={p} featured={p.featured} />
          </motion.div>
        ))}
      </div>

      {projects.length > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href="#all-projects"
            className="inline-flex items-center gap-2 font-mono text-[0.85rem] uppercase tracking-wide px-6 py-3 bg-[var(--surface)] text-text rounded border border-[var(--border)] hover:border-accent hover:text-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--card-hover-glow)] transition-all duration-300"
          >
            Explore More Projects <ArrowRight size={16} />
          </a>
        </motion.div>
      )}
    </section>
  );
}
