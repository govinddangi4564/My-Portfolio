import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Activity', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'projects', 'skills', 'github', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav
        className={`nav-pill max-w-[1180px] mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
          scrolled ? 'shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl' : ''
        }`}
      >
        {/* LOGO + Recruiter HUD indicator */}
        <div className="flex items-center gap-3">
          <a href="#" className="font-syne text-[1.15rem] font-bold select-none tracking-tight flex items-center gap-1.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-accent2 flex items-center justify-center text-white text-xs font-mono font-bold shadow-[0_0_15px_var(--card-hover-glow)] group-hover:scale-105 transition-transform">
              GD
            </div>
            <span className="hidden sm:inline font-mono text-[0.8rem] text-text font-semibold ml-1">
              govind<span className="text-accent2">.dev</span>
            </span>
          </a>

          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[0.65rem]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Open to Opportunities</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-surface/40 p-1 rounded-full border border-[var(--border)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative font-mono text-[0.74rem] uppercase tracking-[1.2px] px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-text font-bold bg-accent/20 border border-accent/40 shadow-[0_0_12px_var(--card-hover-glow)]'
                    : 'text-muted hover:text-text hover:bg-surface/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all duration-300 bg-surface/50"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={onOpenTerminal}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-wide px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent hover:bg-accent hover:text-[var(--on-accent)] transition-all duration-300"
            title="Press ` or ~ key anytime"
          >
            <TerminalIcon size={13} />
            <span>CLI</span>
            <kbd className="hidden lg:inline text-[0.55rem] px-1.5 py-0.5 rounded bg-black/40 text-accent2 border border-accent2/30">~</kbd>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] sm:text-[0.75rem] uppercase tracking-wide px-4 sm:px-5 py-1.5 sm:py-2 rounded-full btn-glow text-[var(--on-accent)] shadow-[0_0_20px_var(--card-hover-glow)] font-semibold"
          >
            <Sparkles size={13} className="hidden sm:inline" />
            <span>Let&apos;s Connect</span>
          </a>


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-accent2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden nav-pill max-w-[1100px] mx-auto mt-2 overflow-hidden bg-surface/95 backdrop-blur-2xl border border-[var(--border)]"
          >
            <div className="flex flex-col items-center gap-1.5 py-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[0.68rem] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Available for Full-Stack Roles</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[0.82rem] uppercase tracking-[1.5px] text-muted hover:text-accent2 transition-colors py-2 px-6"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onOpenTerminal(); }}
                className="font-mono text-[0.78rem] uppercase tracking-[1.5px] text-accent flex items-center gap-2 py-2"
              >
                <TerminalIcon size={15} />
                Open Interactive Terminal
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[0.75rem] uppercase tracking-wide px-6 py-2.5 rounded-full btn-glow text-[var(--on-accent)] mt-2"
              >
                Contact Govind →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

