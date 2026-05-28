import { useEffect, useState } from "react";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjectsPage from "./components/AllProjectsPage";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-bg text-text relative">
      <Background3D theme={theme} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {currentPage === "home" ? (
        <main>
          <Hero theme={theme} />
          <StatsBar />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      ) : (
        <main>
          <AllProjectsPage />
        </main>
      )}

      <Footer />
    </div>
  );
}
