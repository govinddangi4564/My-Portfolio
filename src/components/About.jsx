import { motion } from 'framer-motion';
import Timeline from './Timeline';

import { Coffee, ShieldCheck, Layout, GraduationCap } from 'lucide-react';

const highlights = [
  { icon: <Coffee className="text-accent" size={24} />, title: 'Java-First Backend', body: 'Strong foundation in Java, Servlets, JSP, JDBC, and Spring Boot — building robust, scalable server-side applications.' },
  { icon: <ShieldCheck className="text-accent2" size={24} />, title: 'Security-Conscious', body: 'BCrypt password hashing, OTP-based 2FA authentication, role-based access control, and SQL-level auth checks.' },
  { icon: <Layout className="text-accent3" size={24} />, title: 'Full-Stack Depth', body: 'Comfortable from MySQL database design and JDBC transactions all the way to HTML/CSS/JS frontend and REST APIs.' },
  { icon: <GraduationCap className="text-accent" size={24} />, title: 'Continuous Learner', body: 'B.Tech CSE student actively sharpening DSA skills, exploring Spring Boot, and participating in GCP Codelabs & workshops.' },
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
        <span className="section-tag">01. about me</span>
        <h2 className="section-title">Who I Am</h2>
      </motion.div>

      {/* TOP ROW — Photo & Bio */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start mb-16">
        {/* 3D Photo Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8, rotateY: 10, rotateX: 5, scale: 1.02 }}
          className="relative w-[200px] h-[260px] sm:w-[220px] sm:h-[280px] shrink-0 rounded-2xl border border-accent/30 bg-card overflow-hidden shadow-[0_0_30px_var(--photo-glow)] group z-10"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Animated scanning line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent2/20 to-transparent h-[200%] -top-[100%] group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />
          
          <img 
            src="/profile.jpg" 
            alt="Govind Dangi" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-125 saturate-50 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500 z-10" 
          />
          
          {/* Fallback placeholder if image is missing */}
          <div className="hidden absolute inset-0 bg-surface items-center justify-center text-accent/50 font-mono text-[0.6rem] text-center px-4 border border-dashed border-accent/20 rounded-2xl z-0">
            Save your photo as <br/> public/profile.jpg
          </div>
        </motion.div>

        {/* Bio Text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="flex-1 font-body text-[0.85rem] text-muted leading-[1.8] space-y-4 text-center md:text-left"
        >
          <p>I&apos;m a B.Tech CSE student at Prestige Institute of Engineering Management and Research, Indore — focused on building efficient and responsive web applications that deliver real value to users.</p>
          <p>I work across the full stack with Java, Spring Boot, Servlets, JSP, and MySQL on the backend, and HTML, CSS, JavaScript, and React on the frontend. My recent work includes an NLP-based resume screening system (HireDrift) and a full-stack pathology lab management system with 2FA auth.</p>
          <p>Currently I&apos;m strengthening my backend skills with Spring Boot, practicing Data Structures &amp; Algorithms, and actively participating in workshops like GCP Codelabs and Flutter &amp; Firebase training.</p>
        </motion.div>
      </div>

      {/* BOTTOM ROW — Timeline & Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
        
        {/* LEFT — Timeline */}
        <div>
          <Timeline />
        </div>

        {/* RIGHT — Highlight Cards */}
        <div className="flex flex-col gap-4 mt-10">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-lg border border-[var(--border)] bg-card hover:translate-x-1 hover:border-accent/40 transition-all duration-300 cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{h.icon}</div>
                <div>
                  <h4 className="font-syne text-[0.9rem] font-bold text-text">{h.title}</h4>
                  <p className="font-body text-[0.85rem] text-muted mt-1 leading-relaxed">{h.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
