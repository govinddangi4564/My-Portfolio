export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[0.65rem] text-dimmed">
        <span>© 2025 <span className="text-accent2">Govind Dangi</span></span>
        <span>Indore · MP · India 🇮🇳</span>
      </div>
    </footer>
  );
}
