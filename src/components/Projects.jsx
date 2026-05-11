import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
        <span className="section-tag">03. selected work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="font-mono text-[0.78rem] text-muted -mt-4 mb-8">Real systems, real problems solved — not just tutorial clones.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={p.featured ? 'md:col-span-2' : ''}
          >
            <ProjectCard project={p} featured={p.featured} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
