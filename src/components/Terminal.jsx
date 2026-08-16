import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Govind Dangi OS v1.0.0' },
    { type: 'output', text: 'Type a command to interact with the portfolio.\n\nAvailable commands:\n  about   - Learn more about me\n  projects- List recent projects\n  skills  - List technical skills\n  resume  - View my resume\n  contact - Get contact information\n  clear   - Clear terminal output\n  exit    - Close terminal' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const commands = {
    help: 'Available commands:\n  about   - Learn more about me\n  projects- List recent projects\n  skills  - List technical skills\n  resume  - View my resume\n  contact - Get contact information\n  clear   - Clear terminal output\n  exit    - Close terminal',
    whoami: 'user@govind',
    projects: 'Recent Projects & Vault Repositories:\n1. PathLab Manager - Java Full-Stack System (2FA & ACID)\n2. HireDrift - NLP Resume Screening (Sentence-BERT)\n3. ShipTrack AI - Logistics & Shipment Tracker\n4. E-Commerce System - MVC Architecture\n5. E-Commerce DAL (Spring Boot) - Spring Data JPA & Transactions\n6. E-Commerce DAL (Hibernate) - Native SessionFactory & HQL\n7. JWT Security - Stateless Token Auth & Spring Security\n8. ClimateAct - Eco Platform\n9. LifeLine AI - Patient Routing\n(Explore all 9 systems in the 3D Vault!)',
    project: 'Recent Projects & Vault Repositories:\n1. PathLab Manager - Java Full-Stack System (2FA & ACID)\n2. HireDrift - NLP Resume Screening (Sentence-BERT)\n3. ShipTrack AI - Logistics & Shipment Tracker\n4. E-Commerce System - MVC Architecture\n5. E-Commerce DAL (Spring Boot) - Spring Data JPA & Transactions\n6. E-Commerce DAL (Hibernate) - Native SessionFactory & HQL\n7. JWT Security - Stateless Token Auth & Spring Security\n8. ClimateAct - Eco Platform\n9. LifeLine AI - Patient Routing\n(Explore all 9 systems in the 3D Vault!)',

    skills: 'Frontend: HTML, CSS, JS, React, Bootstrap, Three.js\nBackend: Java, Spring Boot, JSP/Servlet, Hibernate, MySQL\nTools: Git, Docker, Postman, Python, C/C++',
    contact: 'Email: govinddangi4564@gmail.com\nGitHub: github.com/govinddangi4564',
    resume: 'Opening resume... (If this were a real OS, a PDF would open!). You can find my full experience in the About section of the site.',
    ls: 'about.txt  contact.txt  projects.txt  resume.pdf  skills.json',
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    let newHistory = [...history, { type: 'input', text: `user@govind:~$ ${cmdStr}` }];
    
    if (cmd === 'clear') {
      newHistory = [];
    } else if (cmd === 'exit') {
      onClose();
      setInput('');
      return;
    } else if (commands[cmd]) {
      newHistory.push({ type: 'output', text: commands[cmd] });
    } else if (cmd !== '') {
      newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <div 
            className="w-full max-w-2xl bg-[#090d16] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_0_50px_rgba(139,92,246,0.2)] flex flex-col font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon size={16} className="text-accent2" />
                <span className="text-xs font-bold text-text">govind@systems-terminal ~ zsh</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-slate-400 hover:text-white transition-colors" onClick={onClose}><Minus size={14} /></button>
                <button className="p-1 text-slate-400 hover:text-white transition-colors"><Square size={12} /></button>
                <button className="p-1 text-slate-400 hover:text-accent3 transition-colors" onClick={onClose}><X size={14} /></button>
              </div>
            </div>

            {/* Quick action chips bar */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-surface/50 border-b border-[var(--border)] overflow-x-auto text-[0.7rem]">
              <span className="text-dimmed text-[0.65rem] uppercase mr-1 shrink-0">Quick run:</span>
              {['about', 'projects', 'skills', 'contact', 'resume', 'clear'].map((btnCmd) => (
                <button
                  key={btnCmd}
                  type="button"
                  onClick={() => runCommand(btnCmd)}
                  className="px-2.5 py-0.5 rounded-full bg-surface border border-[var(--border)] text-accent2 hover:bg-accent/20 hover:border-accent transition-colors shrink-0"
                >
                  {btnCmd}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div 
              className="p-5 h-[380px] overflow-y-auto text-[0.85rem] leading-relaxed cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div 
                  key={i} 
                  className={`mb-2 whitespace-pre-wrap ${
                    line.type === 'error' ? 'text-accent3' : 
                    line.type === 'input' ? 'text-accent2 font-bold' : 'text-slate-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">govind@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-text font-mono"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

