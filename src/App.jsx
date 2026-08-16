import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Background3D from "./components/Background3D";
import AuroraBackground from "./components/AuroraBackground";
import ScrollProgress from "./components/ScrollProgress";
import ParticleGridBackground from "./components/ParticleGridBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import useMediaQuery from "./hooks/useMediaQuery";

// Lazy-load secondary components to keep initial bundle ultra lightweight
const Terminal = lazy(() => import("./components/Terminal"));
const GithubStats = lazy(() => import("./components/GithubStats"));
const AllProjectsPage = lazy(() => import("./components/AllProjectsPage"));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });
  const [currentPage, setCurrentPage] = useState("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // On low-power / mobile / touch devices, disable heavy background 3D WebGL and use optimized visuals
  const isMobile = isTouchDevice || isSmallScreen;
  const useLightVisuals = isMobile || prefersReducedMotion;
  const disableBackground3D = isMobile || prefersReducedMotion;

  useEffect(() => {
    // Simple hash-based router
    const handleHashChange = () => {
      if (window.location.hash === "#all-projects") {
        setCurrentPage("all-projects");
        window.scrollTo(0, 0);
      } else {
        setCurrentPage("home");
        if (window.location.hash && window.location.hash !== "#") {
          setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo(0, 0);
            }
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // check on mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        autoRaf: true,
      }}
    >
      <div className="min-h-screen bg-bg text-text relative overflow-hidden">
        <ScrollProgress />
        <CustomCursor />
        {isTerminalOpen && (
          <Suspense fallback={null}>
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          </Suspense>
        )}
        <AuroraBackground theme={theme} />
        <Background3D theme={theme} disabled={disableBackground3D} />
        <ParticleGridBackground theme={theme} lightMode={useLightVisuals} />
        <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenTerminal={() => setIsTerminalOpen(true)} />

        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <motion.main
              key="home"
              className="relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero theme={theme} lightVisuals={useLightVisuals} />
              <StatsBar />
              <About />
              <Projects theme={theme} lightVisuals={useLightVisuals} />
              <Skills lightVisuals={useLightVisuals} />
              <Suspense fallback={<div className="min-h-[200px]" />}>
                <GithubStats theme={theme} />
              </Suspense>
              <Contact lightVisuals={useLightVisuals} />

            </motion.main>
          ) : (
            <motion.main
              key="all-projects"
              className="relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<div className="min-h-screen" />}>
                <AllProjectsPage />
              </Suspense>
            </motion.main>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />
        </div>
      </div>
    </ReactLenis>
  );
}

