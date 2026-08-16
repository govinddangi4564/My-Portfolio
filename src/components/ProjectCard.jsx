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
    glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--card-inner-glow) 0%, transparent 65%)`;
  };

  return (
    <TiltCard
      scale={active ? 1.02 : 1.01}
      className={`group rounded-2xl bento-card shadow-lg transition-all duration-400 relative w-full h-full cursor-pointer flex flex-col ${
        active
          ? "border-accent/60 shadow-[0_30px_80px_var(--card-hover-glow)] ring-1 ring-accent/30"
          : "hover:border-accent/40 hover:shadow-[0_20px_50px_var(--card-hover-glow)]"
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
        {/* Glow cursor effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        />

        {active && (
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent via-accent2 to-accent opacity-25 blur-sm pointer-events-none z-0" />
        )}

        {/* Visual Project Preview Banner */}
        <div className="relative w-full h-32 sm:h-48 overflow-hidden rounded-t-2xl bg-surface/50 border-b border-[var(--border)] shrink-0">
          {/* Fallback Cybernetic Geometric SVG Background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `radial-gradient(circle at 75% 25%, ${project.color || 'var(--accent)'}22 0%, transparent 60%), linear-gradient(135deg, #090d16 0%, #0f172a 100%)`,
            }}
          >
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${project.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-accent" />
                  <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-accent2" />
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
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-105"
            />
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

          {/* Top Badges over Banner */}
          <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between gap-1.5 z-10">
            <div className="inline-flex items-center gap-1 font-mono text-[0.58rem] sm:text-[0.62rem] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 border border-white/15 text-white shadow-md">
              <arch.icon size={10} className="text-accent2" />
              <span className="truncate max-w-[130px] sm:max-w-none">{arch.label.split('·')[0]}</span>
            </div>

            <span
              className={`font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border font-bold shadow-md ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          </div>

          {/* Floating Project Icon on banner corner */}
          <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black/70 border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {project.icon}
          </div>
        </div>


        {/* Project Card Content */}
        <div className="p-3.5 sm:p-6 flex flex-col flex-1 relative z-10">
          {!project.bgImage && (
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {project.icon}
              </div>
              <div className="inline-flex items-center gap-1 font-mono text-[0.58rem] sm:text-[0.62rem] px-2 py-0.5 rounded-full bg-surface border border-[var(--border)] text-dimmed ml-auto">
                <arch.icon size={10} className="text-accent2" />
                <span>{arch.label.split('·')[0]}</span>
              </div>
              <span
                className={`font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${statusColors[project.status]}`}
              >
                {statusLabels[project.status]}
              </span>
            </div>
          )}

          <h3 className="font-syne text-[1.1rem] sm:text-[1.4rem] font-bold text-text mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h3>

          <p className="font-body text-[0.8rem] sm:text-[0.85rem] text-muted leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>

          {project.metrics && (
            <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-surface/70 border border-[var(--border)] mb-3 sm:mb-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <span className="block font-syne text-[0.92rem] sm:text-[1.05rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">
                    {m.num}
                  </span>
                  <span className="font-mono text-[0.55rem] sm:text-[0.6rem] text-dimmed uppercase tracking-wider block truncate">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.58rem] sm:text-[0.65rem] px-2 py-0.5 sm:px-2.5 sm:py-0.8 rounded-md border border-[var(--border)] text-muted bg-surface/50"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="font-mono text-[0.58rem] sm:text-[0.65rem] px-1.5 py-0.5 rounded-md text-dimmed">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div className="flex gap-2 sm:gap-2.5 mt-auto pt-2.5 sm:pt-3 border-t border-[var(--border)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider rounded-full border border-[var(--border)] text-text bg-surface/70 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={12} /> Code
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider rounded-full border border-accent2/30 text-accent2 bg-accent2/10 hover:bg-accent2 hover:text-black transition-all duration-300 font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}


