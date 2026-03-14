import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Tech Stack", href: "#tech-stack", id: "tech-stack" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Detect which section is currently in view with throttling for smoother performance
  useEffect(() => {
    let ticking = false;
    let lastY = 0;

    const handleScroll = () => {
      lastY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastY > 50);

          // Calculate scroll progress
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = (lastY / scrollHeight) * 100;
          setScrollProgress(scrolled);

          // Find the current section in viewport
          for (const link of navLinks) {
            const element = document.getElementById(link.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Check if section is in viewport (with 120px offset from top)
              if (rect.top <= 150 && rect.bottom >= 150) {
                setActiveSection(link.id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ultra-smooth scroll to section with offset for fixed nav
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 120; // Account for fixed nav height + padding
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
        // Browser will use CSS scroll-behavior: smooth for optimal animation
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div
          className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-2xl"
          animate={{
            backgroundColor: isScrolled ? "rgba(10, 10, 15, 0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
            borderBottomColor: isScrolled
              ? "rgba(255, 255, 255, 0.1)"
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderBottom: "1px solid",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex-shrink-0 text-2xl font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              GS
            </span>
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                whileHover={{ color: "#ffffff" }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div
          className="flex items-center justify-between px-4 py-4 rounded-2xl w-full"
          animate={{
            backgroundColor: isScrolled ? "rgba(10, 10, 15, 0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderBottom: "1px solid",
            borderBottomColor: isScrolled
              ? "rgba(255, 255, 255, 0.1)"
              : "transparent",
          }}
        >
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="text-2xl font-bold cursor-pointer">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              GS
            </span>
          </a>

          {/* Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-6 right-6 mt-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 p-4 space-y-2"
            >
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="block px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform-gpu z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </>
  );
}
