import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedBackground from "./components/AnimatedBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import GameModeCanvas from "./components/GameModeCanvas";
import resumeData from "./data/resume.json";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isGameMode, setIsGameMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsGameMode(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <AnimatedBackground />
      <Navigation />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                GS
              </div>
              <div className="w-32 h-1 overflow-hidden bg-white/10 rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-full h-full bg-white/50"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-full bg-black/70 border border-white/10 px-3 py-1.5 shadow-xl shadow-black/25 backdrop-blur-xl">
            <button
              onClick={() => setIsGameMode((value) => !value)}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:scale-[1.03]"
            >
              {isGameMode ? "Exit" : "Play"}
            </button>
            <span className="text-[10px] text-white/70 hidden sm:inline">
              {isGameMode ? "WASD to drive" : "3D mode"}
            </span>
          </div>

          {isGameMode ? (
            <div className="fixed inset-0 z-40 bg-[#05060c]">
              <GameModeCanvas />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/80">
                    Game Mode Active
                  </span>
                  <span className="text-sm text-white/70">
                    WASD movement · Click the glowing boxes · Escape or toggle to exit
                  </span>
                </div>
                <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur-xl">
                  Explore the 3D world as a portfolio hub. The scene is intentionally simple so it stays fast and polished.
                </div>
              </div>
            </div>
          ) : (
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 container mx-auto px-6 py-24 max-w-5xl space-y-32 pt-32"
            >
              <section id="home">
                <Hero data={resumeData.basics} />
              </section>

              <section id="tech-stack">
                <TechStack />
              </section>

              <section id="projects">
                <Projects data={resumeData.projects} />
              </section>

              <section id="experience">
                <Experience data={resumeData.experience} />
              </section>

              <section id="skills">
                <Skills data={resumeData.skills} />
              </section>

              <section id="education">
                <Education data={resumeData.education} />
              </section>

              <section id="contact">
                <Contact data={resumeData.basics} />
              </section>

              <footer className="pt-20 pb-10 text-center text-white/40 text-sm">
                <p>
                  © {new Date().getFullYear()} {resumeData.basics.name}. All rights
                  reserved.
                </p>
              </footer>
            </motion.main>
          )}
        </>
      )}
    </div>
  );
}
