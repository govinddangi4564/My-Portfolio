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
    <section id="contact" className="relative overflow-hidden pt-12 pb-16">
      <Earth3D lightMode={lightVisuals} />
      <div className="section-container relative z-10">
        <div className="bento-card p-6 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-accent2 w-4 h-4" />
              <span className="section-tag m-0">05. recruiter hub & contact</span>
            </div>
            <h2 className="section-title">Let&apos;s Build Next-Gen Systems</h2>
            <p className="font-body text-[1rem] text-muted -mt-4 max-w-2xl leading-relaxed">
              Have an open software engineering role, contract project, or technical question? Send a message below or connect directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14">
            {/* LEFT — Recruiter HUD & Direct Line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Live IST Telemetry Box */}
                <div className="p-4 rounded-xl bg-surface/70 border border-[var(--border)] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-accent2" />
                    <div>
                      <span className="font-mono text-[0.68rem] text-dimmed uppercase tracking-wider block">
                        Location & Time Zone
                      </span>
                      <span className="font-syne text-[0.88rem] font-bold text-text">
                        Indore, India (IST · UTC+5:30)
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[0.78rem] text-emerald-400 font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {currentTime || "12:00 PM"}
                  </div>
                </div>

                {/* Direct Contact Cards with 1-Click Copy */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-surface/50 border border-[var(--border)] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[0.62rem] uppercase tracking-wider text-dimmed block">
                        Direct Email Address
                      </span>
                      <a
                        href="mailto:govinddangi585@gmail.com"
                        className="font-mono text-[0.85rem] text-accent2 font-semibold hover:underline block mt-0.5"
                      >
                        govinddangi585@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("govinddangi585@gmail.com", "email")}
                      className="p-2 rounded-lg bg-surface border border-[var(--border)] text-muted hover:text-accent2 transition-colors"
                      title="Copy Email"
                    >
                      {copiedType === "email" ? (
                        <Check size={15} className="text-emerald-400" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-surface/50 border border-[var(--border)] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[0.62rem] uppercase tracking-wider text-dimmed block">
                        Phone & WhatsApp
                      </span>
                      <a
                        href="tel:+917067624564"
                        className="font-mono text-[0.85rem] text-text font-semibold hover:text-accent2 transition-colors block mt-0.5"
                      >
                        +91-7067624564
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("+917067624564", "phone")}
                      className="p-2 rounded-lg bg-surface border border-[var(--border)] text-muted hover:text-accent2 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedType === "phone" ? (
                        <Check size={15} className="text-emerald-400" />
                      ) : (
                        <Phone size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[var(--border)]">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-dimmed block mb-3">
                  Verified Engineering Channels:
                </span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wide px-3.5 py-2 rounded-xl border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 hover:bg-accent2/10 transition-all duration-300 font-medium"
                    >
                      <s.icon size={14} />
                      {s.label}
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
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Preset Inquiry Chips */}
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-dimmed flex items-center gap-1.5 mb-2">
                  <MessageSquare size={12} className="text-accent" /> Quick Inquiry Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => applyPreset(p.msg)}
                      className="font-mono text-[0.68rem] px-3 py-1.5 rounded-lg border border-[var(--border)] bg-surface/60 text-muted hover:text-text hover:border-accent/40 hover:bg-accent/10 transition-all text-left"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {[
                {
                  id: "name",
                  label: "Your Name / Organization",
                  type: "text",
                  placeholder: "e.g. Jane Doe / Tech Corp",
                  value: form.name,
                },
                {
                  id: "email",
                  label: "Work / Personal Email",
                  type: "email",
                  placeholder: "name@company.com",
                  value: form.email,
                },
              ].map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="font-mono text-[0.65rem] uppercase tracking-wider text-accent mb-1 block font-semibold"
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
                    className="w-full bg-surface/70 border border-[var(--border)] rounded-xl px-4 py-2.5 font-mono text-[0.8rem] text-text outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/15 transition-all"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[0.65rem] uppercase tracking-wider text-accent mb-1 block font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Share details about the role, project, or requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-surface/70 border border-[var(--border)] rounded-xl px-4 py-2.5 font-mono text-[0.8rem] text-text outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/15 transition-all resize-y min-h-[90px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 font-mono text-[0.78rem] uppercase tracking-wider px-8 py-3.5 btn-glow text-[var(--on-accent)] rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_35px_var(--card-hover-glow)] transition-all duration-300 self-start disabled:opacity-70 disabled:cursor-not-allowed font-semibold shadow-lg mt-1"
              >
                {isSubmitting ? (
                  "Transmitting Message..."
                ) : sent ? (
                  "✓ Transmitted Successfully!"
                ) : (
                  <>
                    <Send size={14} /> Transmit Message →
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

