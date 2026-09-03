import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code2,
  FolderGit2,
  Cpu,
  Mail,
  FileText,
  Terminal,
  Sun,
  Moon,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  Command,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose, onToggleTheme, theme, onOpenTerminal, soundEnabled, onToggleSound }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'projects',
      title: 'Explore Systems & 3D Vault',
      subtitle: 'View production Java, Spring Boot, NLP & Full-Stack projects',
      icon: FolderGit2,
      category: 'Navigation',
      badge: '9 Systems',
      onSelect: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'about',
      title: 'Engineering Profile & Philosophy',
      subtitle: 'B.Tech CSE, ACID database principles, system architecture',
      icon: Code2,
      category: 'Navigation',
      onSelect: () => {
        window.location.hash = '#about';
        onClose();
      }
    },
    {
      id: 'skills',
      title: 'Technical Skills Matrix',
      subtitle: 'Java, Spring Boot, MySQL, React, NLP, REST APIs, DSA',
      icon: Cpu,
      category: 'Navigation',
      onSelect: () => {
        window.location.hash = '#skills';
        onClose();
      }
    },
    {
      id: 'terminal',
      title: 'Launch Interactive CLI Terminal',
      subtitle: 'Interactive command line experience with GovindOS commands',
      icon: Terminal,
      category: 'Tools',
      badge: 'Press `',
      onSelect: () => {
        onClose();
        setTimeout(onOpenTerminal, 150);
      }
    },
    {
      id: 'resume',
      title: 'Download / View Resume (PDF)',
      subtitle: 'Official Software Engineer Resume & Academic Distinction',
      icon: FileText,
      category: 'Documents',
      badge: 'PDF',
      onSelect: () => {
        window.open('/govind-resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'email',
      title: 'Copy Direct Email Address',
      subtitle: 'govinddangi585@gmail.com',
      icon: Mail,
      category: 'Contact',
      badge: copiedEmail ? 'Copied!' : '1-Click',
      onSelect: () => {
        navigator.clipboard.writeText('govinddangi585@gmail.com');
        setCopiedEmail(true);
        sound.playSuccess();
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 800);
      }
    },
    {
      id: 'pathlab',
      title: 'Project: PathLab Manager (2FA & ACID)',
      subtitle: 'Full-stack medical diagnostics system with Java, Spring Boot, MySQL',
      icon: ShieldCheck,
      category: 'Featured Projects',
      onSelect: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'hiredrift',
      title: 'Project: HireDrift (Sentence-BERT NLP)',
      subtitle: 'Semantic resume matching platform with Python & FastAPI backend',
      icon: Sparkles,
      category: 'Featured Projects',
      onSelect: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'theme',
      title: `Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle global color mode and contrast',
      icon: theme === 'dark' ? Sun : Moon,
      category: 'Preferences',
      onSelect: () => {
        onToggleTheme();
      }
    },
    {
      id: 'sound',
      title: `Toggle Audio Haptics (${soundEnabled ? 'Enabled' : 'Muted'})`,
      subtitle: 'Subtle mechanical synth click sounds for UI feedback',
      icon: soundEnabled ? Volume2 : VolumeX,
      category: 'Preferences',
      onSelect: () => {
        onToggleSound();
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      sound.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      sound.playHover();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        sound.playClick();
        filtered[selectedIndex].onSelect();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[1000] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-[#090c13] rounded-2xl border border-emerald-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)] overflow-hidden font-mono text-text flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[#0d121c]">
              <Search size={18} className="text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, search project, or jump to section..."
                className="w-full bg-transparent outline-none text-[0.85rem] sm:text-[0.9rem] text-text placeholder-dimmed font-mono"
              />
              <span className="text-[0.62rem] uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-[var(--border)] text-dimmed shrink-0">
                ESC
              </span>
            </div>

            {/* Command Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-dimmed text-[0.8rem]">
                  No matching command or project found for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        item.onSelect();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-text shadow-sm'
                          : 'bg-transparent border border-transparent text-muted hover:bg-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-400 text-black font-bold' : 'bg-surface text-muted'}`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-syne text-[0.85rem] font-bold text-text truncate">
                              {item.title}
                            </span>
                            <span className="text-[0.58rem] uppercase px-1.5 py-0.2 rounded bg-surface text-dimmed shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <span className="font-mono text-[0.68rem] text-dimmed block truncate mt-0.5">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      {item.badge && (
                        <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded-full bg-surface border border-[var(--border)] text-emerald-400 shrink-0 ml-2">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer shortcuts hint */}
            <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[#0c1018] flex items-center justify-between text-[0.65rem] text-dimmed">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Command size={11} />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
