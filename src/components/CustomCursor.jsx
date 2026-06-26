import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isEnabled = () =>
      pointerFine.matches && !reducedMotion.matches;

    const applyHover = (target) => {
      hovering.current = !!(
        target.closest("a, button, [data-cursor='pointer'], .tilt-card, .project-3d-node")
      );
      if (ringRef.current) {
        ringRef.current.classList.toggle("cursor-ring--hover", hovering.current);
      }
    };

    let rafId = 0;

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.55;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.55;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const enable = () => {
      if (!isEnabled() || enabledRef.current) return;
      enabledRef.current = true;
      document.body.classList.add("custom-cursor-active");
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      rafId = requestAnimationFrame(tick);
    };

    const disable = () => {
      if (!enabledRef.current) return;
      enabledRef.current = false;
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e) => applyHover(e.target);

    const onMediaChange = () => (isEnabled() ? enable() : disable());

    if (isEnabled()) enable();

    pointerFine.addEventListener("change", onMediaChange);
    reducedMotion.addEventListener("change", onMediaChange);

    return () => {
      disable();
      pointerFine.removeEventListener("change", onMediaChange);
      reducedMotion.removeEventListener("change", onMediaChange);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div className="custom-cursor hidden md:block" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
