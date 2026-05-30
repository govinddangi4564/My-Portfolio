import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Code2, Briefcase, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/govinddangi4564",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/govinddangi4564/",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/govind_dangiii/",
  },
  { icon: Phone, label: "Call", href: "tel:+917067624564" },
  { icon: FileText, label: "Resume", href: "/govind-resume.pdf" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setTimeout(() => setSent(false), 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-surface">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">06. get in touch</span>
          <h2 className="section-title">Let&apos;s Build Something Great</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-[0.8rem] text-muted leading-relaxed mb-6">
              I'm always open to discussing new projects, internships, or
              full-time roles. Whether you have a question or just want to say
              hello — my inbox is always open.
            </p>
            <div className="mb-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-dimmed">
                reach me at
              </span>
              <a
                href="mailto:govinddangi580@gmail.com"
                className="block font-mono text-[0.85rem] text-accent2 mt-1 hover:underline"
              >
                govinddangi580@gmail.com
              </a>
              <a
                href="tel:+917067624564"
                className="block font-mono text-[0.75rem] text-muted mt-1 hover:text-accent2 transition-colors"
              >
                +91-7067624564
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wide px-3 py-2 rounded border border-[var(--border)] text-muted hover:text-accent2 hover:border-accent2/40 hover:shadow-[0_0_12px_var(--accent2-soft-glow)] transition-all duration-300"
                >
                  <s.icon size={14} />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {[
              {
                id: "name",
                label: "Your Name",
                type: "text",
                value: form.name,
              },
              { id: "email", label: "Email", type: "email", value: form.email },
            ].map((f) => (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  className="font-mono text-[0.62rem] uppercase tracking-wider text-accent mb-1 block"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  value={f.value}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="w-full bg-card border border-[var(--border)] rounded px-4 py-2.5 font-mono text-[0.78rem] text-text outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/10 transition-all"
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="font-mono text-[0.62rem] uppercase tracking-wider text-accent mb-1 block"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-[var(--border)] rounded px-4 py-2.5 font-mono text-[0.78rem] text-text outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/10 transition-all resize-y min-h-[80px]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 font-mono text-[0.75rem] uppercase tracking-wide px-6 py-2.5 bg-accent text-[var(--on-accent)] rounded hover:-translate-y-0.5 hover:shadow-[0_6px_24px_var(--card-hover-glow)] transition-all duration-300 self-start disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : sent ? (
                "✓ Sent!"
              ) : (
                <>
                  <Send size={14} /> Send Message →
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
