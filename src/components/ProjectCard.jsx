import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useRef } from "react";
import MagneticWrapper from "./MagneticWrapper";

const statusColors = {
  wip: "text-accent3 border-accent3/40 bg-accent3/10",
  complete: "text-accent border-accent/40 bg-accent/10",
  live: "text-accent2 border-accent2/40 bg-accent2/10",
};
const statusLabels = { wip: "WIP", complete: "Complete", live: "Live" };

export default function ProjectCard({ project, featured = false }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // For the follow-mouse glow
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 300, damping: 30 });
  
  const background = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, var(--card-inner-glow) 0%, transparent 80%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = featured
    ? "col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] gap-0"
    : "col-span-1 flex flex-col";

  return (
    <div style={{ perspective: "2000px" }} className="h-full w-full flex">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg hover:border-accent hover:shadow-[0_20px_50px_var(--card-hover-glow)] transition-all duration-500 relative w-full flex-1 ${cls}`}
      >
        {/* Dynamic 3D Glow that follows mouse */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl"
          style={{ background }}
        />

        {/* Featured icon panel */}
        {featured && (
          <div 
            className="relative flex items-center justify-center p-10 bg-[var(--surface)] border-b sm:border-b-0 sm:border-r border-[var(--border)] min-h-[220px] rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl z-10 overflow-hidden"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="scale-[2.5] transform transition-all duration-700 group-hover:scale-[2.8] group-hover:-rotate-6 drop-shadow-2xl">
              {project.icon}
            </div>
            <MagneticWrapper magneticStrength={0.2} className="absolute top-4 left-4 z-20">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/30 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
                Featured
              </span>
            </MagneticWrapper>
          </div>
        )}

        {/* Content */}
        <div 
          className="p-8 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-transparent to-[var(--surface)]/30 rounded-b-2xl sm:rounded-bl-none sm:rounded-r-2xl"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Top row: icon (non-featured) + status */}
          <div className="flex items-center justify-between mb-5">
            {!featured && (
              <div className="transform transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 drop-shadow-xl">
                {project.icon}
              </div>
            )}
            <MagneticWrapper magneticStrength={0.15}>
              <span
                className={`font-mono text-[0.65rem] uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${statusColors[project.status]}`}
              >
                {statusLabels[project.status]}
              </span>
            </MagneticWrapper>
          </div>

          {/* Name */}
          <h3 className="font-syne text-[1.6rem] font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h3>

          {/* Description */}
          <p className="font-mono text-[0.95rem] text-muted leading-relaxed mb-6 flex-1 transition-colors duration-300 group-hover:text-text">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex gap-6 mb-6" style={{ transform: "translateZ(30px)" }}>
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center transform transition-all duration-500 hover:scale-110">
                  <span className="block font-mono text-[1.25rem] font-bold text-text group-hover:text-accent transition-colors duration-300">
                    {m.num}
                  </span>
                  <span className="font-mono text-[0.7rem] text-dimmed uppercase tracking-wider">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6" style={{ transform: "translateZ(30px)" }}>
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className="font-mono text-[0.75rem] px-3 py-1 rounded-md border border-[var(--border)] text-muted bg-[var(--surface)] group-hover:border-accent/50 group-hover:text-accent transition-colors duration-300 shadow-sm"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-auto pt-5 border-t border-[var(--border)] group-hover:border-accent/30 transition-colors duration-500" style={{ transform: "translateZ(40px)" }}>
            {project.github && (
              <MagneticWrapper magneticStrength={0.2}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider rounded-full border border-[var(--border)] text-text bg-[var(--surface)] hover:text-accent hover:border-accent hover:bg-accent/10 shadow-sm hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all duration-300 relative z-20"
                >
                  <FaGithub size={16} /> Code
                </a>
              </MagneticWrapper>
            )}
            {project.live && project.live !== "#" && (
              <MagneticWrapper magneticStrength={0.2}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider rounded-full border border-[var(--border)] text-text bg-[var(--surface)] hover:text-accent2 hover:border-accent2 hover:bg-accent2/10 shadow-sm hover:shadow-[0_0_20px_rgba(var(--accent2-rgb),0.3)] transition-all duration-300 relative z-20"
                >
                  <ExternalLink size={16} /> Deploy
                </a>
              </MagneticWrapper>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
