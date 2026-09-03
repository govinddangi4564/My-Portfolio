import { useRef, useState } from "react";
import { ExternalLink, Layers, ShieldCheck, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TiltCard from "./TiltCard";

const statusColors = {
  wip: "text-accent3 border-accent3/40 bg-accent3/10",
  complete: "text-accent border-accent/40 bg-accent/10",
  live: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
};
const statusLabels = { wip: "WIP", complete: "Complete", live: "Production" };

const getArchitectureBadge = (name) => {
  if (name.includes("PathLab")) return { label: "Architecture: MVC + DAO · 2FA Security", icon: ShieldCheck };
  if (name.includes("HireDrift")) return { label: "AI: Sentence-BERT NLP · 85% Accuracy", icon: Cpu };
  if (name.includes("Spring Boot") || name.includes("Spring DAL")) return { label: "Architecture: Spring Data JPA · ACID DAL", icon: Layers };
  if (name.includes("Hibernate")) return { label: "ORM: Native Hibernate · HQL & Caching", icon: Layers };
  if (name.includes("JWT")) return { label: "Security: Stateless JWT Auth · Spring Security", icon: ShieldCheck };
  if (name.includes("MediRoute") || name.includes("LifeLine")) return { label: "System: Spring Boot · Microservices Ready", icon: Layers };
  if (name.includes("Ocean") || name.includes("ShipTrack")) return { label: "AI: Google Gemini · Multi-Modal Logistics", icon: Cpu };
  return { label: "Architecture: Multi-Tier Full Stack", icon: Layers };
};


export default function ProjectCard({ project, featured = false, active = false, onFocus }) {
  const glowRef = useRef(null);
  const cardRectRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const arch = getArchitectureBadge(project.name);

  const handleMouseEnter = (e) => {
    cardRectRef.current = e.currentTarget.getBoundingClientRect();
    onFocus?.();
  };

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = cardRectRef.current || e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, transparent 65%)`;
  };

  return (
    <TiltCard
      scale={active ? 1.015 : 1.008}
      className={`group rounded-2xl bg-zinc-950/90 border transition-all duration-300 relative w-full h-full cursor-pointer flex flex-col overflow-hidden ${
        active
          ? "border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
          : "border-zinc-800/90 hover:border-zinc-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        data-cursor="pointer"
        onMouseEnter={handleMouseEnter}
        onFocus={() => onFocus?.()}
        onMouseMove={handleMouseMove}
        onKeyDown={(e) => e.key === "Enter" && onFocus?.()}
        className="relative w-full h-full flex flex-col overflow-hidden rounded-2xl"
      >
        {/* Dynamic Glow Cursor Spotlight */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        />

        {/* TOP BROWSER CHROME HEADER */}
        <div className="px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800/90 flex items-center justify-between text-zinc-500 text-[0.62rem] font-mono shrink-0 z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="text-zinc-400 font-mono text-[0.62rem] ml-2 tracking-wider uppercase font-semibold">
              SYS://{project.shortName || project.name.split(' ')[0]}
            </span>
            {featured && (
              <span className="ml-2 px-2 py-0.2 rounded-full bg-rose-400/15 text-rose-300 border border-rose-400/30 text-[0.55rem] font-bold">
                FLAGSHIP
              </span>
            )}
          </div>
          <span className="text-[0.58rem] text-zinc-400 uppercase font-mono font-medium">
            {project.status === "live" ? "● ONLINE" : project.status === "complete" ? "✓ ARCHIVED" : "⚡ ACTIVE BUILD"}
          </span>
        </div>

        {/* MAIN BODY: SPLIT LAYOUT FOR FEATURED, VERTICAL FOR REGULAR */}
        <div className={`flex flex-col ${featured ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""} flex-1`}>
          {/* VISUAL PROJECT PREVIEW BANNER */}
          <div className={`relative w-full ${featured ? "min-h-[220px] lg:min-h-[300px] border-b lg:border-b-0 lg:border-r" : "h-36 sm:h-48 border-b"} overflow-hidden bg-zinc-950 border-zinc-800/90 shrink-0`}>
            {/* Cyber Grid Background */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(135deg, #09090c 0%, #121216 100%)`,
              }}
            >
              <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`grid-${project.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-zinc-500" />
                    <circle cx="0" cy="0" r="1.2" fill="currentColor" className="text-zinc-300" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
              </svg>
            </div>

            {project.bgImage && !imgError && (
              <img
                src={project.bgImage}
                alt=""
                loading="lazy"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
            )}

            {/* Gradients Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

            {/* Top Badges over Banner */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between gap-1.5 z-10">
              <div className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] sm:text-[0.62rem] px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700/80 text-zinc-200 shadow-md">
                <arch.icon size={11} className="text-zinc-300" />
                <span className="truncate max-w-[140px] sm:max-w-none">{arch.label.split('·')[0]}</span>
              </div>

              <span
                className={`font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider px-2.5 py-0.8 rounded-full border font-bold shadow-md ${statusColors[project.status]}`}
              >
                {project.status === 'live' ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Production</span>
                  </span>
                ) : (
                  statusLabels[project.status]
                )}
              </span>
            </div>

            {/* Floating Icon Badge */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-zinc-500 transition-all duration-300">
              {project.icon}
            </div>
          </div>

          {/* CARD CONTENT */}
          <div className="p-4 sm:p-6 flex flex-col flex-1 relative z-10 justify-between">
            <div>
              <h3 className="font-syne text-[1.18rem] sm:text-[1.42rem] font-bold text-white mb-2 group-hover:text-rose-300 transition-colors duration-200">
                {project.name}
              </h3>

              <p className="font-body text-[0.82rem] sm:text-[0.88rem] text-zinc-400 leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                {project.description}
              </p>

              {/* Key Metrics Chips */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <span className="block font-syne text-[0.95rem] sm:text-[1.12rem] font-bold text-rose-300">
                        {m.num}
                      </span>
                      <span className="font-mono text-[0.55rem] sm:text-[0.62rem] text-zinc-400 uppercase tracking-wider block truncate font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.58rem] sm:text-[0.65rem] px-2.5 py-0.8 rounded-md border border-zinc-800 text-zinc-300 bg-zinc-900/80 hover:border-zinc-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > (featured ? 6 : 4) && (
                  <span className="font-mono text-[0.58rem] sm:text-[0.65rem] px-1.5 py-0.8 rounded-md text-zinc-500">
                    +{project.tags.length - (featured ? 6 : 4)}
                  </span>
                )}
              </div>
            </div>

            {/* Action Links Footer */}
            <div className="flex items-center gap-2.5 pt-3.5 border-t border-zinc-800/80">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-[0.68rem] sm:text-[0.74rem] uppercase tracking-wider rounded-lg border border-zinc-800 text-zinc-300 bg-zinc-900/90 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={13} /> Code
                </a>
              )}
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black font-mono text-[0.68rem] sm:text-[0.74rem] uppercase font-bold hover:bg-zinc-200 transition-all shadow-sm ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}


