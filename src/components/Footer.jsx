import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";

export default function Footer({ onOpenTerminal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 py-10 px-6 bg-zinc-950">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-[0.85rem] text-white font-bold uppercase tracking-wider">
            Govind <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Dangi</span>
          </span>
          <span className="font-mono text-[0.68rem] text-zinc-500">
            © {currentYear} · Designed with elegance &amp; precision
          </span>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/govinddangi4564", icon: FaGithub, label: "GitHub" },
            { href: "https://www.linkedin.com/in/govinddangi4564/", icon: FaLinkedin, label: "LinkedIn" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer me"
              className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
              aria-label={item.label}
            >
              <item.icon size={16} />
            </a>
          ))}
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
            aria-label="Open Terminal"
          >
            <FaTerminal size={16} />
          </button>
        </div>

        <div className="font-mono text-[0.68rem] text-zinc-500">
          Indore · MP · India 🇮🇳
        </div>
      </div>
    </footer>
  );
}
