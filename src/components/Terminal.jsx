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
    about: 'Hi, I am Govind Dangi, a passionate Full-Stack Developer specializing in creating beautiful web experiences with React, Java, and modern web technologies.',
    projects: 'Recent Projects:\n1. PathLab Manager - Java Full-Stack System\n2. HireDrift - NLP Resume Screening\n3. ShipTrack AI - Logistics & Shipment Tracker\n4. E-Commerce System - MVC Architecture\n5. ClimateAct - Eco Platform\n6. LifeLine AI - Patient Routing\n(Close the terminal to see them in detail!)',
    project: 'Recent Projects:\n1. PathLab Manager - Java Full-Stack System\n2. HireDrift - NLP Resume Screening\n3. ShipTrack AI - Logistics & Shipment Tracker\n4. E-Commerce System - MVC Architecture\n5. ClimateAct - Eco Platform\n6. LifeLine AI - Patient Routing\n(Close the terminal to see them in detail!)',
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

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      let newHistory = [...history, { type: 'input', text: `user@govind:~$ ${input}` }];
      
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
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <div 
            className="w-full max-w-2xl bg-[#0f172a] rounded-lg overflow-hidden border border-[var(--border)] shadow-2xl flex flex-col font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon size={16} />
                <span className="text-xs">bash - govind@portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-slate-400 hover:text-white transition-colors" onClick={onClose}><Minus size={14} /></button>
                <button className="text-slate-400 hover:text-white transition-colors"><Square size={12} /></button>
                <button className="text-slate-400 hover:text-accent3 transition-colors" onClick={onClose}><X size={14} /></button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              className="p-4 h-[400px] overflow-y-auto text-[0.85rem] leading-relaxed cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div 
                  key={i} 
                  className={`mb-1 whitespace-pre-wrap ${
                    line.type === 'error' ? 'text-accent3' : 
                    line.type === 'input' ? 'text-accent2' : 'text-slate-300'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-accent2">user@govind:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-slate-300"
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
