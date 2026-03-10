import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import resumeData from "./data/resume.json";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <AnimatedBackground />

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
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 container mx-auto px-6 py-24 max-w-5xl space-y-32"
        >
          <Hero data={resumeData.basics} />
          <Experience data={resumeData.experience} />
          <Skills data={resumeData.skills} />
          <Education data={resumeData.education} />

          <footer className="pt-20 pb-10 text-center text-white/40 text-sm">
            <p>
              © {new Date().getFullYear()} {resumeData.basics.name}. All rights
              reserved.
            </p>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
