import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function AllProjectsPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-wide text-dimmed hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <span className="section-tag">archive</span>
          <h1 className="section-title">All Projects</h1>
          <p className="font-mono text-[0.85rem] text-muted -mt-4">
            A complete record of the projects, apps, and side-quests I've worked
            on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.05 }}
              className={p.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} featured={p.featured} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
