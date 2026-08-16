import { useEffect, useRef } from "react";

const DESKTOP_PARTICLE_COUNT = 160;
const TABLET_PARTICLE_COUNT = 60;
const MOBILE_PARTICLE_COUNT = 35;

function parseHex(color) {
  if (!color) return { r: 255, g: 255, b: 255 };
  const value = color.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;
    const int = Number.parseInt(fullHex, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255,
    };
  }
  return { r: 139, g: 92, b: 246 };
}

export default function ParticleGridBackground({ theme, lightMode = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = 0;

    // Cache theme colors to avoid calling getComputedStyle in the 60fps draw loop
    const computedStyles = getComputedStyle(document.documentElement);
    const accentHex = computedStyles.getPropertyValue("--accent").trim() || (theme === "light" ? "#6366f1" : "#8b5cf6");
    const accent2Hex = computedStyles.getPropertyValue("--accent2").trim() || (theme === "light" ? "#0891b2" : "#22d3ee");
    const textHex = computedStyles.getPropertyValue("--text").trim() || (theme === "light" ? "#0f172a" : "#f8fafc");

    const accentRGB = parseHex(accentHex);
    const accent2RGB = parseHex(accent2Hex);
    const dotColorRGB = theme === "light" ? { r: 6, g: 20, b: 33 } : parseHex(textHex);

    const accentAlpha = (a) => `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${a})`;
    const accent2Alpha = (a) => `rgba(${accent2RGB.r},${accent2RGB.g},${accent2RGB.b},${a})`;
    const dotColorAlpha = (a) => `rgba(${dotColorRGB.r},${dotColorRGB.g},${dotColorRGB.b},${a})`;

    const buildParticles = () => {
      const isMobile = window.innerWidth < 768;
      const isSmallMobile = window.innerWidth < 640;
      const count = lightMode || reduceMotion.matches
        ? (isSmallMobile ? 25 : 40)
        : (isSmallMobile ? MOBILE_PARTICLE_COUNT : (isMobile ? TABLET_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT));

      particlesRef.current = Array.from({ length: count }, (_, index) => {
        const isLarge = index % 20 === 0;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isLarge
            ? Math.random() * 1.2 + 1.8
            : Math.random() * 0.6 + 0.35,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          pulse: Math.random() * Math.PI * 2,
          depth: index % 3,
          isLarge,
        };
      });
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const isMobile = window.innerWidth < 768;
      // Cap pixelRatio at 1 on mobile to ensure top performance
      pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildParticles();
    };

    const drawOrbitalCurves = () => {
      context.lineWidth = theme === "light" ? 1.5 : 1.0;

      context.beginPath();
      context.strokeStyle = accentAlpha(theme === "light" ? 0.2 : 0.15);
      context.arc(
        width * 0.86,
        height * 0.45,
        width * 0.44,
        Math.PI * 1.05,
        Math.PI * 1.82,
      );
      context.stroke();

      context.beginPath();
      context.strokeStyle = accent2Alpha(theme === "light" ? 0.12 : 0.1);
      context.arc(
        width * 0.56,
        height * 0.66,
        width * 0.38,
        Math.PI * 1.15,
        Math.PI * 1.9,
      );
      context.stroke();

      context.beginPath();
      context.strokeStyle = accentAlpha(theme === "light" ? 0.1 : 0.08);
      context.ellipse(
        width * 0.54,
        height * 0.56,
        width * 0.3,
        height * 0.18,
        -0.16,
        Math.PI * 1.08,
        Math.PI * 1.75,
      );
      context.stroke();
    };

    const draw = (time = 0) => {
      if (!isVisibleRef.current) {
        rafRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const delta = Math.min(time - lastTime, 32);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      drawOrbitalCurves();

      const particles = particlesRef.current;
      const isMotionAllowed = !reduceMotion.matches;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        if (isMotionAllowed) {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.pulse += 0.02;
        }

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        const opacity = particle.isLarge
          ? theme === "light"
            ? 0.85
            : 0.7
          : theme === "light"
            ? 0.55 + particle.depth * 0.1
            : 0.35 + particle.depth * 0.08;

        context.beginPath();
        context.fillStyle = dotColorAlpha(opacity);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    resize();
    rafRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [theme, lightMode]);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${lightMode ? "opacity-25" : "opacity-50"}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        backgroundPosition: "0 0",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}


