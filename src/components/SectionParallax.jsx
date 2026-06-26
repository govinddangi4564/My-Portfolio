import { useRef, useEffect } from "react";

export default function SectionParallax({ children, className = "", id }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return undefined;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (center - viewCenter) / window.innerHeight;
      el.style.transform = `perspective(1200px) rotateX(${offset * 2}deg) translateZ(0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`section-parallax ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.1s linear", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
