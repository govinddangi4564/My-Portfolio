import { ExternalLink, Code2 } from 'lucide-react';

const statusColors = { wip: 'text-accent3 border-accent3/30 bg-accent3/5', complete: 'text-accent border-accent/30 bg-accent/5', live: 'text-accent2 border-accent2/30 bg-accent2/5' };
const statusLabels = { wip: 'WIP', complete: 'Complete', live: 'Live' };

export default function ProjectCard({ project, featured = false }) {
  const cls = featured
    ? 'col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] gap-0'
    : 'col-span-1 flex flex-col';

  return (
    <div className={`gradient-bar group rounded-xl border border-[var(--border)] bg-card overflow-hidden hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-[0_12px_40px_rgba(123,111,240,0.12)] transition-all duration-400 ${cls}`}>
      {/* Featured icon panel */}
      {featured && (
        <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-accent/10 to-accent2/5 min-h-[180px]">
          <span className="text-6xl">{project.icon}</span>
          <span className="absolute top-3 left-3 font-mono text-[0.55rem] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded">Featured</span>
          {/* Inner glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(123,111,240,0.1) 0%, transparent 60%)' }} />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Top row: icon (non-featured) + status */}
        <div className="flex items-center justify-between mb-3">
          {!featured && <span className="text-3xl">{project.icon}</span>}
          <span className={`font-mono text-[0.58rem] uppercase tracking-wider px-2 py-0.5 rounded border ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-syne text-[1.05rem] font-bold text-text mb-2">{project.name}</h3>

        {/* Description */}
        <p className="font-mono text-[0.72rem] text-muted leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex gap-4 mb-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <span className="block font-mono text-[0.9rem] font-bold text-accent2">{m.num}</span>
                <span className="font-mono text-[0.55rem] text-dimmed uppercase tracking-wide">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[0.55rem] px-2 py-0.5 rounded border border-[var(--border)] text-muted bg-bg">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all" aria-label="GitHub">
            <Code2 size={16} />
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all" aria-label="Live demo">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
