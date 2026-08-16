import { useRef, useEffect } from "react";

export default function SectionParallax({ children, className = "", id }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reducedMotion) return undefined;

    let ticking = false;
    let windowHeight = window.innerHeight;

    const onResize = () => {
      windowHeight = window.innerHeight;
    };

    const updateTransform = () => {
      if (!el) {
        ticking = false;
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = windowHeight / 2;
      const offset = (center - viewCenter) / windowHeight;
      el.style.transform = `perspective(1200px) rotateX(${offset * 1.5}deg) translateZ(0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`section-parallax ${className}`}
    >
      {children}
    </div>
  );
}

