import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectsShowcase3D from "./ProjectsShowcase3D";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Systems" },
  { id: "java", label: "Java & Spring" },
  { id: "ai", label: "AI & NLP" },
  { id: "web", label: "Full-Stack Web" },
];

export default function Projects({ theme, lightVisuals = false }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selected, setSelected] = useState(0);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    if (selectedCategory === "java") {
      return projects.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase().includes("java") || t.toLowerCase().includes("spring") || t.toLowerCase().includes("jsp"))
      );
    }
    if (selectedCategory === "ai") {
      return projects.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase().includes("nlp") || t.toLowerCase().includes("machine learning") || t.toLowerCase().includes("bert") || t.toLowerCase().includes("python"))
      );
    }
    if (selectedCategory === "web") {
      return projects.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase().includes("react") || t.toLowerCase().includes("full stack") || t.toLowerCase().includes("javascript"))
      );
    }
    return projects;
  }, [selectedCategory]);

  const displayProjects = filteredProjects.slice(0, 4);

  const goNext = useCallback(() => {
    setSelected((prev) => (prev + 1) % projects.length);
  }, []);

  const goPrev = useCallback(() => {
    setSelected((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const activeProject = projects[selected] || projects[0];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="projects" ref={containerRef} className="section-container relative z-10">
      
      {/* Parallax Ambient Background Elements (desktop only) */}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY, rotate: bgRotate }}
          className="hidden md:block absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10"
        />
      )}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY2 }}
          className="hidden md:block absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-accent2/10 rounded-full blur-[80px] pointer-events-none -z-10"
        />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-accent w-4 h-4" />
          <span className="section-tag m-0">02. selected systems</span>
        </div>
        <h2 className="section-title">Featured Production Architectures</h2>
        <p className="font-body text-[1rem] text-muted -mt-4 max-w-2xl leading-relaxed">
          Interactive 3D system showcase and project telemetry. Every build represents real-world architectural design, security mechanisms, and production-ready code.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="font-mono text-[0.68rem] text-dimmed flex items-center gap-1 mr-1">
            <Filter size={12} /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[0.72rem] font-semibold transition-all ${
                  isCatActive
                    ? "bg-accent text-white shadow-[0_0_15px_var(--card-hover-glow)] border border-accent"
                    : "bg-surface/70 border border-[var(--border)] text-muted hover:text-text hover:border-accent/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
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

      {/* Active project quick view HUD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="bento-card p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-accent/30 relative overflow-hidden"
        >
          {activeProject.bgImage && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src={activeProject.bgImage}
                alt=""
                className="w-full h-full object-cover object-center opacity-15 dark:opacity-25 filter blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)]/95 via-[var(--surface)]/80 to-[var(--surface)]/95" />
            </div>
          )}

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/25">
              {activeProject.icon}
            </div>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-widest text-accent2 mb-1 font-bold">
                Active 3D Telemetry Target
              </p>
              <h3 className="font-syne text-[1.2rem] font-bold text-text">
                {activeProject.name}
              </h3>
            </div>
          </div>
          <p className="font-body text-[0.85rem] text-muted sm:max-w-md sm:text-right relative z-10">
            {activeProject.description.slice(0, 130)}…
          </p>
        </motion.div>

      </AnimatePresence>

      {/* 3D tilt project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {displayProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`h-full ${p.featured ? "md:col-span-2" : ""}`}
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
            className="inline-flex items-center gap-3 font-mono text-[0.82rem] uppercase tracking-wider px-8 py-4 rounded-full btn-glow text-[var(--on-accent)] group font-semibold shadow-[0_10px_35px_var(--card-hover-glow)]"
          >
            <span>Explore All Systems & Repositories</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </a>
        </motion.div>
      )}
    </section>
  );
}

