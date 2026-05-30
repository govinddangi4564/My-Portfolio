import { FaGithub, FaLinkedin, FaInstagram, FaTerminal } from "react-icons/fa";

export default function Footer({ onOpenTerminal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8 px-6 bg-surface">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-[0.8rem] text-text font-bold uppercase tracking-wider">
            Govind <span className="text-accent2">Dangi</span>
          </span>
          <span className="font-mono text-[0.65rem] text-dimmed">
            © {currentYear} · Built with React & Three.js
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/govinddangi4564"
            target="_blank"
            rel="noopener noreferrer me"
            className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/govinddangi4564/"
            target="_blank"
            rel="noopener noreferrer me"
            className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="https://www.instagram.com/govind_dangiii/"
            target="_blank"
            rel="noopener noreferrer me"
            className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded border border-[var(--border)] text-muted hover:text-accent hover:border-accent/40 transition-all duration-300"
            aria-label="Open Terminal"
          >
            <FaTerminal size={16} />
          </button>
        </div>

        <div className="font-mono text-[0.65rem] text-dimmed">
          Indore · MP · India 🇮🇳
        </div>
      </div>
    </footer>
  );
}
