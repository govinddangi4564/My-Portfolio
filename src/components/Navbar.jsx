import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Terminal as TerminalIcon } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
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
        className={`nav-pill max-w-[1100px] mx-auto flex items-center justify-between px-5 py-3 transition-all duration-500 ${
          scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.25)]' : ''
        }`}
      >
        <a href="#" className="font-syne text-[1.15rem] font-bold select-none tracking-tight">
          <span className="text-accent">G</span>
          <span className="text-text">D</span>
          <span className="text-dimmed font-mono text-[0.7rem] ml-1">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link font-mono text-[0.78rem] uppercase tracking-[1.2px] text-muted hover:text-text px-4 py-2 rounded-full hover:bg-accent/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 transition-all duration-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={onOpenTerminal}
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-wide px-4 py-2 rounded-full bg-accent/15 border border-accent/30 text-accent hover:bg-accent hover:text-[var(--on-accent)] transition-all duration-300"
          >
            <TerminalIcon size={14} />
            Terminal
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center font-mono text-[0.75rem] uppercase tracking-wide px-4 py-2 rounded-full btn-glow text-[var(--on-accent)]"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-muted hover:text-accent2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="md:hidden nav-pill max-w-[1100px] mx-auto mt-2 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[0.8rem] uppercase tracking-[1.5px] text-muted hover:text-accent2 transition-colors py-2.5 px-6"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onOpenTerminal(); }}
                className="font-mono text-[0.78rem] uppercase tracking-[1.5px] text-accent flex items-center gap-2 py-2.5"
              >
                <TerminalIcon size={15} />
                Terminal
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[0.72rem] uppercase tracking-wide px-6 py-2.5 rounded-full btn-glow text-[var(--on-accent)] mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
