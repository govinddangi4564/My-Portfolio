import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--border)]' : ''
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="font-mono text-[1.1rem] select-none">
          <span className="text-accent/60">[</span>
          <span className="text-accent2">GD</span>
          <span className="text-accent2">.dev</span>
          <span className="text-accent/60">]</span>
          <span className="inline-block w-[2px] h-[16px] bg-accent2 ml-1 align-middle"
                style={{ animation: 'blink-cursor 1s step-end infinite' }} />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link font-mono text-[0.85rem] uppercase tracking-[1.5px] text-muted hover:text-accent2 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1 font-mono text-[0.78rem] uppercase tracking-[1px] px-3 py-2 border border-[var(--border)] text-muted rounded hover:border-accent2/40 hover:text-accent2 transition-all duration-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1 font-mono text-[0.85rem] uppercase tracking-[1px] px-4 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-[var(--on-accent)] transition-all duration-300"
          >
            Hire Me <span className="text-sm">↗</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted hover:text-accent2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[0.78rem] uppercase tracking-[1.5px] text-muted hover:text-accent2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[0.72rem] uppercase tracking-[1px] px-5 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-[var(--on-accent)] transition-all"
              >
                Hire Me ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
