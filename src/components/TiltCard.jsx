import { useEffect, useRef } from "react";

export function useTilt3D(maxTilt = 14, scale = 1.03) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt, scale]);

  return ref;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 14,
  scale = 1.03,
  style = {},
}) {
  const ref = useTilt3D(maxTilt, scale);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out", ...style }}
    >
      {children}
    </div>
  );
}
