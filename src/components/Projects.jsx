import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectsShowcase3D from "./ProjectsShowcase3D";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function Projects({ theme, lightVisuals = false }) {
  const displayProjects = projects.slice(0, 4);
  const [selected, setSelected] = useState(0);

  const goNext = useCallback(() => {
    setSelected((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goPrev = useCallback(() => {
    setSelected((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const activeProject = projects[selected];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="projects" ref={containerRef} className="section-container relative z-10 perspective-1200">
      
      {/* Parallax Ambient Background Elements */}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY, rotate: bgRotate }}
          className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10"
        />
      )}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY2 }}
          className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-accent2/10 rounded-full blur-[80px] pointer-events-none -z-10"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-accent w-4 h-4" />
          <span className="section-tag m-0">04. selected work</span>
        </div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="font-body text-[1rem] text-muted -mt-4 max-w-2xl leading-relaxed">
          Explore my work in 3D — click panels, use arrows, or hover cards below.
          Real systems built with scale in mind.
        </p>
      </motion.div>

      {/* Interactive 3D Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="mb-8 relative"
      >
        <ProjectsShowcase3D
          projects={projects}
          selected={selected}
          onSelect={setSelected}
          theme={theme}
          lightMode={lightVisuals}
        />

        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none z-30">
          <button
            type="button"
            data-cursor="pointer"
            onClick={goPrev}
            className="pointer-events-auto w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            data-cursor="pointer"
            onClick={goNext}
            className="pointer-events-auto w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all"
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>

      {/* Active project quick view */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="glass-panel p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4 border-accent/20"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              {activeProject.icon}
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent mb-1">
                Now viewing
              </p>
              <h3 className="font-syne text-[1.2rem] font-bold text-text">
                {activeProject.name}
              </h3>
            </div>
          </div>
          <p className="font-body text-[0.85rem] text-muted sm:max-w-md sm:text-right">
            {activeProject.description.slice(0, 120)}…
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 3D tilt project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {displayProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`h-full ${p.featured ? "md:col-span-2" : ""}`}
            style={{ perspective: "1200px" }}
          >
            <ProjectCard
              project={p}
              featured={p.featured}
              active={selected === i}
              onFocus={() => setSelected(i)}
            />
          </motion.div>
        ))}
      </div>

      {projects.length > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="#all-projects"
            data-cursor="pointer"
            className="inline-flex items-center gap-3 font-mono text-[0.82rem] uppercase tracking-wider px-8 py-4 rounded-full btn-glow text-[var(--on-accent)] group"
          >
            <span>Explore All Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      )}
    </section>
  );
}
