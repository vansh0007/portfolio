import { motion } from "motion/react";
import { useState } from "react";

export default function ProfileImage({ 
  src, 
  alt = "Profile" 
}: { 
  src: string; 
  alt: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!src) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="relative flex-shrink-0 will-change-transform"
    >
      {/* Background effects container */}
      <div className="absolute -inset-12 z-0">
        {/* Primary animated glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary counter-rotating glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-l from-cyan-500/15 via-indigo-500/10 to-blue-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent glow layer */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Main container with border */}
      <div 
        className="relative w-64 h-64 md:w-80 md:h-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient border with multiple layers */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400/40 via-purple-500/30 to-pink-500/40 p-[2px] overflow-hidden"
          animate={{
            borderRadius: isHovered ? "2rem" : "1.5rem",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Inner frosted glass effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl" />
        </motion.div>

        {/* Secondary border accent */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-cyan-500/20 to-transparent opacity-40 p-[1px]"
          animate={{
            opacity: isHovered ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Static decorative border gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 pointer-events-none" />

        {/* Image container */}
        <motion.div
          className="relative z-10 h-full rounded-3xl overflow-hidden"
          animate={{
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />

          {/* Multiple overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-900/15" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-purple-900/10" />

          {/* Premium shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
            initial={{ x: "-100%" }}
            animate={isHovered ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />

          {/* Color shift overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0"
            animate={isHovered ? {
              backgroundColor: ["rgba(67, 56, 202, 0)", "rgba(147, 51, 234, 0.1)", "rgba(67, 56, 202, 0)"]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-indigo-500/40 pointer-events-none"
          animate={{
            rotate: 360,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.4 },
          }}
        />

        <motion.div
          className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-purple-500/30 pointer-events-none"
          animate={{
            rotate: -360,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.4 },
          }}
        />

        <motion.div
          className="absolute top-1/2 -right-4 w-16 h-16 rounded-full border border-cyan-500/25 pointer-events-none"
          animate={{
            rotate: [0, 360],
            y: [0, 20, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Corner accent dots */}
        {[
          "top-2 left-2",
          "top-2 right-2",
          "bottom-2 left-2",
          "bottom-2 right-2",
        ].map((position, i) => (
          <motion.div
            key={i}
            className={`absolute ${position} w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500`}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
