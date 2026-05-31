import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 700;

function colorWithAlpha(color, alpha) {
  if (!color) return `rgba(255,255,255,${alpha})`;

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
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return value;
}

export default function ParticleGridBackground({ theme, lightMode = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const burstsRef = useRef([]);
  const lightningRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = 0;

    const buildParticles = () => {
      const count = lightMode
        ? window.innerWidth < 640
          ? 55
          : 120
        : window.innerWidth < 640
          ? 145
          : PARTICLE_COUNT;
      particlesRef.current = Array.from({ length: count }, (_, index) => {
        const isLarge = index % 28 === 0;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isLarge
            ? Math.random() * 1.4 + 2.1
            : Math.random() * 0.65 + 0.35,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
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
      pixelRatio = Math.min(window.devicePixelRatio || 1, lightMode ? 1.25 : 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildParticles();
    };

    const drawOrbitalCurves = (accent, accent2) => {
      context.save();
      context.lineWidth = theme === "light" ? 1.8 : 1.2;

      context.beginPath();
      context.strokeStyle = colorWithAlpha(
        accent,
        theme === "light" ? 0.22 : 0.18,
      );
      context.arc(
        width * 0.86,
        height * 0.45,
        width * 0.44,
        Math.PI * 1.05,
        Math.PI * 1.82,
      );
      context.stroke();

      context.beginPath();
      context.strokeStyle = colorWithAlpha(
        accent2,
        theme === "light" ? 0.14 : 0.12,
      );
      context.arc(
        width * 0.56,
        height * 0.66,
        width * 0.38,
        Math.PI * 1.15,
        Math.PI * 1.9,
      );
      context.stroke();

      context.beginPath();
      context.strokeStyle = colorWithAlpha(
        accent,
        theme === "light" ? 0.12 : 0.1,
      );
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

      context.restore();
    };

    const createBurst = (event) => {
      const burstCount = 50;
      const boltCount = 7;
      const now = performance.now();

      for (let index = 0; index < burstCount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.15 + 0.25;

        burstsRef.current.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.85 + 1,
          bornAt: now,
          life: Math.random() * 1100 + 3100,
        });
      }

      for (let boltIndex = 0; boltIndex < boltCount; boltIndex += 1) {
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 120 + 90;
        const segments = 8;
        const points = [{ x: event.clientX, y: event.clientY }];

        for (let segment = 1; segment <= segments; segment += 1) {
          const progress = segment / segments;
          const jitter = (Math.random() - 0.5) * 26;
          const spread = (Math.random() - 0.5) * 18;

          points.push({
            x:
              event.clientX +
              Math.cos(angle) * length * progress +
              Math.cos(angle + Math.PI / 2) * jitter,
            y:
              event.clientY +
              Math.sin(angle) * length * progress +
              Math.sin(angle + Math.PI / 2) * jitter +
              spread,
          });
        }

        lightningRef.current.push({
          points,
          bornAt: now,
          life: Math.random() * 900 + 1800,
          width: Math.random() * 0.8 + 0.8,
        });
      }
    };

    const draw = (time = 0) => {
      if (lightMode && time - lastTime < 32) {
        rafRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim();
      const accent2 = styles.getPropertyValue("--accent2").trim();
      const text = styles.getPropertyValue("--text").trim();
      const dotColor = theme === "light" ? "#061421" : text;
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      drawOrbitalCurves(accent, accent2);

      particlesRef.current.forEach((particle) => {
        if (!reduceMotion.matches) {
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
            ? 0.9
            : 0.72
          : theme === "light"
            ? 0.62 + particle.depth * 0.11
            : 0.38 + particle.depth * 0.09;

        context.beginPath();
        context.fillStyle = colorWithAlpha(dotColor, opacity);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      burstsRef.current = burstsRef.current.filter((particle) => {
        const age = time - particle.bornAt;
        if (age > particle.life) return false;

        if (!reduceMotion.matches) {
          particle.x += particle.vx * (delta / 16);
          particle.y += particle.vy * (delta / 16);
          particle.vy += 0.01 * (delta / 16);
        }

        const progress = age / particle.life;
        const opacity = (1 - progress) * (theme === "light" ? 0.9 : 0.72);

        context.beginPath();
        context.fillStyle = colorWithAlpha(dotColor, opacity);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        return true;
      });

      lightningRef.current = lightningRef.current.filter((bolt) => {
        const age = time - bolt.bornAt;
        if (age > bolt.life) return false;

        const opacity =
          (1 - age / bolt.life) * (theme === "light" ? 0.65 : 0.82);

        context.save();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowBlur = 12;
        context.shadowColor = colorWithAlpha(accent2, opacity);

        context.beginPath();
        bolt.points.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
        context.lineWidth = bolt.width + 1.4;
        context.strokeStyle = colorWithAlpha(accent2, opacity * 0.28);
        context.stroke();

        context.beginPath();
        bolt.points.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
        context.lineWidth = bolt.width;
        context.strokeStyle = colorWithAlpha(
          theme === "light" ? accent : "#ffffff",
          opacity,
        );
        context.stroke();
        context.restore();

        return true;
      });

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    rafRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    if (!lightMode) {
      window.addEventListener("pointerdown", createBurst);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (!lightMode) {
        window.removeEventListener("pointerdown", createBurst);
      }
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [theme, lightMode]);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${lightMode ? "opacity-45" : "opacity-80"}`}
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
