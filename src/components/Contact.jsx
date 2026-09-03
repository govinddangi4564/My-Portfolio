import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Phone, Clock, Copy, Check, Sparkles, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import Earth3D from "./Earth3D";

const PRESETS = [
  {
    label: "💼 Discuss Job Opportunity",
    msg: "Hi Govind, we reviewed your portfolio and would like to discuss a Software Engineer / Java Full Stack Developer opportunity with our team.",
  },
  {
    label: "💻 Full-Stack Project",
    msg: "Hi Govind, I have an application/system requirement and would like to collaborate on building a scalable architecture.",
  },
  {
    label: "☕ Quick Connect",
    msg: "Hi Govind, I loved your portfolio design and projects! Let's connect and chat about software architecture and tech.",
  },
];

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/govinddangi4564" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/govinddangi4564/" },
  { icon: FaThreads, label: "Threads", href: "https://www.threads.net/@govind_dangiii" },
  { icon: FileText, label: "Resume PDF", href: "/govind-resume.pdf" },
];

export default function Contact({ lightVisuals }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const applyPreset = (msg) => {
    setForm((prev) => ({ ...prev, message: msg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3500);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20">
      <Earth3D lightMode={lightVisuals} />
      <div className="section-container relative z-10">
        <div className="p-5 sm:p-10 lg:p-12 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 shadow-xl backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
              <span className="font-mono text-[0.74rem] uppercase tracking-widest text-brand-pink font-semibold">
                05. recruiter hub &amp; contact
              </span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Let&apos;s Build Next-Gen Systems
            </h2>
            <p className="font-body text-[0.95rem] sm:text-[1.05rem] text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Have an open software engineering role, contract project, or technical question? Send a message below or connect directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-14">
            {/* LEFT — Recruiter HUD & Direct Line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Live IST Telemetry Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 mb-4 sm:mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-brand-pink" />
                    <div>
                      <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-zinc-500 uppercase tracking-wider block">
                        Location &amp; Time Zone
                      </span>
                      <span className="font-syne text-[0.82rem] sm:text-[0.9rem] font-bold text-white">
                        Indore, India (IST · UTC+5:30)
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[0.72rem] sm:text-[0.78rem] text-emerald-400 font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {currentTime || "12:00 PM"}
                  </div>
                </div>

                {/* Direct Contact Cards with 1-Click Copy */}
                <div className="flex flex-col gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-zinc-500 block">
                        Direct Email Address
                      </span>
                      <a
                        href="mailto:govinddangi585@gmail.com"
                        className="font-mono text-[0.8rem] sm:text-[0.88rem] text-zinc-200 font-semibold hover:text-brand-pink transition-colors block mt-0.5 truncate max-w-[210px] sm:max-w-none"
                      >
                        govinddangi585@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("govinddangi585@gmail.com", "email")}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors shrink-0"
                      title="Copy Email"
                    >
                      {copiedType === "email" ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-zinc-500 block">
                        Phone &amp; WhatsApp
                      </span>
                      <a
                        href="tel:+917067624564"
                        className="font-mono text-[0.8rem] sm:text-[0.88rem] text-zinc-200 font-semibold hover:text-brand-pink transition-colors block mt-0.5"
                      >
                        +91-7067624564
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("+917067624564", "phone")}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors shrink-0"
                      title="Copy Phone"
                    >
                      {copiedType === "phone" ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Phone size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-zinc-800">
                <span className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-zinc-400 block mb-2.5 font-semibold">
                  Verified Engineering Channels:
                </span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] sm:text-[0.74rem] uppercase tracking-wide px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-semibold hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all"
                    >
                      <s.icon size={13} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Form with Quick Presets */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col gap-3.5 sm:gap-4"
            >
              {/* Preset Inquiry Chips */}
              <div>
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                  Quick Inquiry Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => applyPreset(p.msg)}
                      className="px-3 py-1 rounded-lg font-mono text-[0.65rem] sm:text-[0.7rem] transition-all duration-200 flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Fields */}
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Alex Mercer / Recruiter", value: form.name },
                { id: "email", label: "Email Address", type: "email", placeholder: "alex@company.com", value: form.email },
                { id: "subject", label: "Subject / Role", type: "text", placeholder: "Full Stack Engineer Role", value: form.subject },
              ].map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-zinc-300 mb-1 block font-semibold"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 font-mono text-[0.78rem] sm:text-[0.82rem] text-white outline-none focus:border-white/50 focus:ring-[1px] focus:ring-white/20 transition-all"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-zinc-300 mb-1 block font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  placeholder="Share details about the role, project, or requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 font-mono text-[0.78rem] sm:text-[0.82rem] text-white outline-none focus:border-white/50 focus:ring-[1px] focus:ring-white/20 transition-all resize-y min-h-[85px]"
                />
              </div>

              {/* Submit CTA Button (Clean White) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-black font-mono text-[0.74rem] sm:text-[0.8rem] uppercase font-bold tracking-wider hover:bg-zinc-200 transition-all self-start shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-1 cursor-pointer"
              >
                {isSubmitting ? (
                  "Transmitting..."
                ) : sent ? (
                  "✓ Transmitted Successfully!"
                ) : (
                  <>
                    <Send size={13} /> Transmit Message →
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
