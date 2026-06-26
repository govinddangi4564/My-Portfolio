export default function AuroraBackground({ theme }) {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-mesh absolute inset-0" />
      <div
        className={`aurora-orb aurora-orb-1 ${theme === "light" ? "aurora-orb-light" : ""}`}
      />
      <div
        className={`aurora-orb aurora-orb-2 ${theme === "light" ? "aurora-orb-light" : ""}`}
      />
      <div
        className={`aurora-orb aurora-orb-3 ${theme === "light" ? "aurora-orb-light" : ""}`}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
