import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Background3D from "./components/Background3D";
import AuroraBackground from "./components/AuroraBackground";
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
import { sound } from "./utils/sound";

// Lazy-load secondary components to keep initial bundle ultra lightweight
const Terminal = lazy(() => import("./components/Terminal"));
const GithubStats = lazy(() => import("./components/GithubStats"));
const AllProjectsPage = lazy(() => import("./components/AllProjectsPage"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const RecruiterFastTrack = lazy(() => import("./components/RecruiterFastTrack"));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });
  const [currentPage, setCurrentPage] = useState("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => sound.enabled);

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
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Terminal: ` or ~
      if (e.key === '`' || e.key === '~') {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
          sound.playClick();
        }
      }
      // Command Palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        sound.playClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
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
        <CustomCursor />
        {isTerminalOpen && (
          <Suspense fallback={null}>
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          </Suspense>
        )}
        {isCommandPaletteOpen && (
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onToggleTheme={toggleTheme}
              theme={theme}
              onOpenTerminal={() => setIsTerminalOpen(true)}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
            />
          </Suspense>
        )}
        {isRecruiterModalOpen && (
          <Suspense fallback={null}>
            <RecruiterFastTrack
              isOpen={isRecruiterModalOpen}
              onClose={() => setIsRecruiterModalOpen(false)}
            />
          </Suspense>
        )}
        <AuroraBackground theme={theme} />
        <Background3D theme={theme} disabled={disableBackground3D} />
        <ParticleGridBackground theme={theme} lightMode={useLightVisuals} />
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

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

