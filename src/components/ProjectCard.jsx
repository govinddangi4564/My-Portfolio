import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TiltCard from "./TiltCard";

const statusColors = {
  wip: "text-accent3 border-accent3/40 bg-accent3/10",
  complete: "text-accent border-accent/40 bg-accent/10",
  live: "text-accent2 border-accent2/40 bg-accent2/10",
};
const statusLabels = { wip: "WIP", complete: "Complete", live: "Live" };

export default function ProjectCard({ project, featured = false, active = false, onFocus }) {
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--card-inner-glow) 0%, transparent 65%)`;
  };

  const cls = featured
    ? "grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] gap-0"
    : "flex flex-col";

  return (
    <TiltCard
      maxTilt={active ? 18 : 12}
      scale={active ? 1.04 : 1.02}
      className={`group rounded-2xl glass-panel shadow-lg transition-all duration-400 relative w-full h-full cursor-pointer project-card-3d ${
        active
          ? "border-accent/60 shadow-[0_24px_60px_var(--card-hover-glow)] ring-1 ring-accent/30"
          : "hover:border-accent/40 hover:shadow-[0_16px_40px_var(--card-hover-glow)]"
      } ${cls}`}
      style={{ willChange: "transform" }}
    >
      <div
        role="button"
        tabIndex={0}
        data-cursor="pointer"
        onMouseEnter={() => onFocus?.()}
        onFocus={() => onFocus?.()}
        onMouseMove={handleMouseMove}
        onKeyDown={(e) => e.key === "Enter" && onFocus?.()}
        className="relative w-full h-full flex flex-col"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        />

        {active && (
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent via-accent2 to-accent opacity-20 blur-sm pointer-events-none z-0" />
        )}

        {featured && (
          <div
            className="relative flex items-center justify-center p-10 bg-[var(--surface)]/50 border-b sm:border-b-0 sm:border-r border-[var(--border)] min-h-[200px] rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl z-10 overflow-hidden"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="scale-[2.2] transition-transform duration-500 group-hover:scale-[2.5] group-hover:-rotate-6 drop-shadow-2xl">
              {project.icon}
            </div>
            <span className="absolute top-4 left-4 font-mono text-[0.6rem] uppercase tracking-wider bg-accent/15 text-accent px-3 py-1 rounded-full border border-accent/30">
              Featured
            </span>
          </div>
        )}

        <div
          className="p-6 sm:p-8 flex flex-col flex-1 relative z-10"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center justify-between mb-4">
            {!featured && (
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {project.icon}
              </div>
            )}
            <span
              className={`font-mono text-[0.62rem] uppercase tracking-wider px-3 py-1 rounded-full border ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          </div>

          <h3 className="font-syne text-[1.4rem] sm:text-[1.55rem] font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h3>

          <p className="font-body text-[0.9rem] text-muted leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {project.metrics && (
            <div className="flex gap-5 mb-5" style={{ transform: "translateZ(20px)" }}>
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <span className="block font-syne text-[1.15rem] font-bold text-accent2">
                    {m.num}
                  </span>
                  <span className="font-mono text-[0.65rem] text-dimmed uppercase tracking-wider">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-5" style={{ transform: "translateZ(20px)" }}>
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.68rem] px-2.5 py-1 rounded-md border border-[var(--border)] text-muted bg-[var(--surface)]/50"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="font-mono text-[0.68rem] px-2.5 py-1 text-dimmed">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          <div
            className="flex gap-3 mt-auto pt-4 border-t border-[var(--border)]"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="flex items-center gap-2 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider rounded-full border border-[var(--border)] text-text bg-[var(--surface)]/60 hover:text-accent hover:border-accent transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={14} /> Code
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="flex items-center gap-2 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider rounded-full border border-[var(--border)] text-text bg-[var(--surface)]/60 hover:text-accent2 hover:border-accent2 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
