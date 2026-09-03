import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Terminal as TerminalIcon, Sparkles, Command, Volume2, VolumeX, Search, Briefcase } from 'lucide-react';
import { sound } from '../utils/sound';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Activity', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme, onOpenTerminal, onOpenCommandPalette, onOpenRecruiterModal, soundEnabled, onToggleSound }) {
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
        className={`nav-pill max-w-[1180px] mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 transition-all duration-500 ${
          scrolled ? 'shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl' : ''
        }`}
      >
        {/* LOGO + Recruiter HUD indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#"
            onClick={() => sound.playClick()}
            className="font-syne text-[1.15rem] font-bold select-none tracking-tight flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple p-[1px] shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-white text-xs font-mono font-bold">
                GD
              </div>
            </div>
            <span className="font-mono text-[0.82rem] text-white font-semibold">
              govind<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple font-bold">.dev</span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenRecruiterModal();
            }}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono text-[0.62rem] hover:border-brand-pink/40 hover:text-white transition-all cursor-pointer"
            title="Click to view Recruiter Scorecard"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Open for SDE Roles</span>
            <span className="text-[0.55rem] px-1 rounded bg-zinc-800 text-zinc-300 font-bold">HUD</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-zinc-800/80">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sound.playClick()}
                className={`relative font-mono text-[0.74rem] uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white font-bold bg-zinc-800 border border-zinc-700/80 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Spotlight / Command Search */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all font-mono text-[0.68rem]"
            title="Search Commands & Projects (Ctrl + K)"
          >
            <Search size={13} />
            <kbd className="hidden sm:inline text-[0.55rem] px-1 py-0.2 rounded bg-black/50 text-zinc-500 border border-zinc-800">
              ⌘K
            </kbd>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all bg-zinc-900/60"
            aria-label="Toggle Sound Effects"
            title={`Audio Haptics: ${soundEnabled ? 'Enabled' : 'Muted'}`}
          >
            {soundEnabled ? <Volume2 size={13} className="text-brand-pink" /> : <VolumeX size={13} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all bg-zinc-900/60"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* CLI Terminal Shortcut */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-brand-purple/40 hover:text-white transition-all duration-300"
            title="Press ` or ~ key anytime"
          >
            <TerminalIcon size={12} />
            <span>CLI</span>
            <kbd className="hidden lg:inline text-[0.55rem] px-1 py-0.2 rounded bg-black/40 text-zinc-400 border border-zinc-800">~</kbd>
          </button>

          {/* Signature Gradient Border Connect Button */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="group cursor-pointer rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple p-[1px] hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-1.5 rounded-[7px] bg-zinc-950 px-3.5 sm:px-4 py-1.5 text-white font-mono text-[0.7rem] sm:text-[0.74rem] uppercase font-bold group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-purple transition-all">
              <Sparkles size={12} className="hidden sm:inline" />
              <span>Contact</span>
            </div>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors ml-1"
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
            className="md:hidden nav-pill max-w-[1100px] mx-auto mt-2 overflow-hidden bg-neutral-950/95 backdrop-blur-2xl border border-zinc-800"
          >
            <div className="flex flex-col items-center gap-1.5 py-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[0.68rem] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Full-Stack Roles</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[0.82rem] uppercase tracking-[1.5px] text-zinc-400 hover:text-white transition-colors py-2 px-6"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onOpenTerminal(); }}
                className="font-mono text-[0.78rem] uppercase tracking-[1.5px] text-brand-pink flex items-center gap-2 py-2"
              >
                <TerminalIcon size={15} />
                Open Interactive Terminal
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="group cursor-pointer rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple p-[1px] mt-2"
              >
                <div className="px-6 py-2 rounded-[7px] bg-zinc-950 text-white font-mono text-[0.75rem] uppercase font-bold group-hover:bg-transparent transition-colors">
                  Contact Govind →
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

