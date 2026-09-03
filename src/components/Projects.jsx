import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectsShowcase3D from "./ProjectsShowcase3D";
import { ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Systems" },
  { id: "java", label: "Java & Spring" },
  { id: "ai", label: "AI & ML" },
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
          p.tags.some((t) => t.toLowerCase().includes("java") || t.toLowerCase().includes("spring") || t.toLowerCase().includes("jsp") || t.toLowerCase().includes("hibernate"))
      );
    }
    if (selectedCategory === "ai") {
      return projects.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase().includes("nlp") || t.toLowerCase().includes("machine learning") || t.toLowerCase().includes("bert") || t.toLowerCase().includes("python") || t.toLowerCase().includes("gemini"))
      );
    }
    if (selectedCategory === "web") {
      return projects.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase().includes("react") || t.toLowerCase().includes("full stack") || t.toLowerCase().includes("web developer") || t.toLowerCase().includes("javascript"))
      );
    }
    return projects;
  }, [selectedCategory]);

  const getCategoryCount = (id) => {
    if (id === "all") return projects.length;
    if (id === "java") return projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("java") || t.toLowerCase().includes("spring") || t.toLowerCase().includes("jsp") || t.toLowerCase().includes("hibernate"))).length;
    if (id === "ai") return projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("nlp") || t.toLowerCase().includes("machine learning") || t.toLowerCase().includes("bert") || t.toLowerCase().includes("python") || t.toLowerCase().includes("gemini"))).length;
    if (id === "web") return projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("react") || t.toLowerCase().includes("full stack") || t.toLowerCase().includes("web developer") || t.toLowerCase().includes("javascript"))).length;
    return 0;
  };

  const displayProjects = filteredProjects;

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

      {/* Parallax Ambient Background Elements */}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY, rotate: bgRotate }}
          className="hidden md:block absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-pink/[0.02] rounded-full blur-[100px] pointer-events-none -z-10"
        />
      )}
      {!lightVisuals && (
        <motion.div
          style={{ y: bgY2 }}
          className="hidden md:block absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-brand-purple/[0.02] rounded-full blur-[80px] pointer-events-none -z-10"
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
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="font-mono text-[0.74rem] uppercase tracking-widest text-rose-300 font-semibold">
            02. selected systems &amp; architectures
          </span>
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Featured Production Architectures
        </h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3 items-baseline">
          <div className="text-white text-lg sm:text-xl">
            <div className="font-semibold">Engineered for production</div>
            <div className="font-serif font-normal italic text-rose-300">
              High throughput, ACID reliability &amp; modern UI
            </div>
          </div>
          <p className="font-body text-[0.92rem] sm:text-[1rem] text-zinc-400 leading-relaxed">
            Explore interactive 3D telemetry and inspect each system&apos;s architectural design, security filters, database layers, and live production endpoints.
          </p>
        </div>

        {/* Category Filters with Counts */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6">
          <span className="font-mono text-[0.68rem] text-zinc-500 flex items-center gap-1 mr-1">
            <Filter size={12} /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer select-none rounded-lg px-4 py-1.5 font-mono text-[0.74rem] transition-all duration-200 flex items-center gap-2 ${isCatActive
                    ? "bg-white text-black font-bold shadow-md scale-[1.02]"
                    : "bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[0.62rem] px-1.5 py-0.2 rounded-full font-bold ${isCatActive ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* INTERACTIVE 3D HOLOGRAPHIC CONSOLE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="mb-12 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 overflow-hidden shadow-2xl relative"
      >
        {/* TOP CONSOLE TELEMETRY BAR */}
        <div className="px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between font-mono text-[0.65rem] sm:text-[0.72rem] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider uppercase">3D System Reactor</span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-zinc-400 hidden sm:inline">HOLOGRAPHIC VIEW</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-semibold hidden md:block">
            SYS [0{selected + 1} / 0{projects.length}]
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-rose-300">↺</span>
            <span className="tracking-wider uppercase">Drag to Rotate</span>
          </div>
        </div>

        {/* 3D VIEWPORT WITH CORNER HUD BRACKETS */}
        <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-zinc-950/90">
          {/* Cybernetic Corner Markers */}
          <div className="absolute top-3 left-3 text-zinc-600 font-mono text-xs select-none pointer-events-none z-20">+</div>
          <div className="absolute top-3 right-3 text-zinc-600 font-mono text-xs select-none pointer-events-none z-20">+</div>
          <div className="absolute bottom-3 left-3 text-zinc-600 font-mono text-xs select-none pointer-events-none z-20">+</div>
          <div className="absolute bottom-3 right-3 text-zinc-600 font-mono text-xs select-none pointer-events-none z-20">+</div>

          <ProjectsShowcase3D
            projects={projects}
            selected={selected}
            onSelect={setSelected}
            theme={theme}
            lightMode={lightVisuals}
          />

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none z-30">
            <button
              type="button"
              data-cursor="pointer"
              onClick={goPrev}
              className="pointer-events-auto w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-all shadow-lg backdrop-blur-md"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              data-cursor="pointer"
              onClick={goNext}
              className="pointer-events-auto w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-all shadow-lg backdrop-blur-md"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* HORIZONTAL SYSTEM DOCK SCROLLER */}
        <div className="px-4 py-3 border-t border-b border-zinc-800/80 bg-zinc-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[0.62rem] text-zinc-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            SYSTEM DOCK:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {projects.map((p, idx) => {
              const isCurrent = selected === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[0.68rem] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? 'bg-white text-black font-bold shadow-md scale-105'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-rose-500' : 'bg-zinc-600'}`} />
                  <span className="text-[0.6rem] opacity-70">0{idx + 1}</span>
                  <span>{p.shortName || p.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOCKED ACTIVE TELEMETRY COCKPIT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-5 bg-zinc-900/70 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative overflow-hidden"
          >
            {activeProject.bgImage && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-5 blur-md pointer-events-none"
                style={{ backgroundImage: `url(${activeProject.bgImage})` }}
              />
            )}

            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
                {activeProject.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="font-mono text-[0.62rem] uppercase tracking-widest text-zinc-400 font-semibold">
                    Target Telemetry Lock · 0{selected + 1}
                  </p>
                </div>
                <h3 className="font-syne text-[1.15rem] sm:text-[1.28rem] font-bold text-white mt-0.5">
                  {activeProject.name}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 relative z-10 lg:ml-auto w-full lg:w-auto justify-between lg:justify-end">
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-300 font-mono text-[0.72rem] uppercase font-semibold hover:text-white hover:border-zinc-600 bg-zinc-950/80 transition-all shadow-sm"
                >
                  Code Repo →
                </a>
              )}
              {activeProject.live && activeProject.live !== "#" && (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-white text-black font-mono text-[0.72rem] uppercase font-bold hover:bg-zinc-200 transition-all shadow-md"
                >
                  Launch Live System ↗
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ASYMMETRICAL FLAGSHIP BENTO SHOWCASE (Top 3 Projects per category) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {displayProjects.length > 0 && (
          /* #1 Flagship Project - Large Panoramic Banner (Full width on desktop) */
          <motion.div
            key={displayProjects[0].id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 h-full"
          >
            <ProjectCard
              project={displayProjects[0]}
              featured={true}
              active={selected === projects.findIndex((proj) => proj.id === displayProjects[0].id)}
              onFocus={() => {
                const idx = projects.findIndex((proj) => proj.id === displayProjects[0].id);
                if (idx !== -1) setSelected(idx);
              }}
            />
          </motion.div>
        )}

        {/* #2 and #3 Complementary Systems (Side-by-side) */}
        {displayProjects.slice(1, 3).map((p, i) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i + 1) * 0.08 }}
            className="h-full"
          >
            <ProjectCard
              project={p}
              featured={false}
              active={selected === projects.findIndex((proj) => proj.id === p.id)}
              onFocus={() => {
                const idx = projects.findIndex((proj) => proj.id === p.id);
                if (idx !== -1) setSelected(idx);
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* CURATED REPOSITORY EXPLORER / THE VAULT BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg"
      >
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <span className="font-mono text-[0.68rem] text-zinc-400 uppercase tracking-widest font-bold">
              Engineering Archive · The Vault
            </span>
          </div>
          <h3 className="font-syne text-xl sm:text-2xl font-bold text-white">
            Looking for all {projects.length} systems &amp; repositories?
          </h3>
          <p className="font-body text-sm text-zinc-400 mt-1 max-w-lg">
            Explore complete database layers, Hibernate DALs, NLP machine learning pipelines, and full-stack side projects in the vault.
          </p>
        </div>

        <a
          href="#all-projects"
          data-cursor="pointer"
          className="inline-flex items-center gap-3 rounded-xl bg-white px-6 sm:px-8 py-3.5 text-black font-mono text-[0.78rem] uppercase font-bold tracking-wider hover:bg-zinc-200 transition-all shadow-md shrink-0 group"
        >
          <span>Explore All {projects.length} Systems</span>
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
