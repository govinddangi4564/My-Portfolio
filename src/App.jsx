import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background3D from "./components/Background3D";
import ParticleGridBackground from "./components/ParticleGridBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjectsPage from "./components/AllProjectsPage";
import CustomCursor from "./components/CustomCursor";
import Terminal from "./components/Terminal";
import GithubStats from "./components/GithubStats";
import useMediaQuery from "./hooks/useMediaQuery";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });
  const [currentPage, setCurrentPage] = useState("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const useLightVisuals = isTouchDevice || prefersReducedMotion;

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
    <div className="min-h-screen bg-bg text-text relative overflow-hidden">
      <CustomCursor />
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <Background3D theme={theme} disabled={useLightVisuals} />
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
            <GithubStats theme={theme} />
            <Projects />
            <Skills />
            <Contact />
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
            <AllProjectsPage />
          </motion.main>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />
      </div>
    </div>
  );
}
