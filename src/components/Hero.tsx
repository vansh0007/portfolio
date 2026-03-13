import { motion } from "motion/react";
import {
  Download,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import ProfileImage from "./ProfileImage";

export default function Hero({ data }: { data: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between min-h-[80vh] gap-12 lg:gap-16">
      <div className="flex-1 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 rounded-full ring-1 ring-indigo-500/20 hover:ring-indigo-500/40 transition-all cursor-pointer group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for new opportunities
            <Sparkles className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {data.name}
            </motion.h1>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300"
          >
            {data.title}
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl text-lg leading-relaxed text-white/50 hover:text-white/70 transition-colors"
        >
          {data.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 text-sm text-white/40"
        >
          {[
            { icon: MapPin, text: data.location },
            { icon: Mail, text: data.email },
            { icon: Phone, text: data.phone },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 hover:text-white/80 transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <item.icon className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
              {item.text}
            </motion.div>
          ))}
          {data.links.map((link: string, i: number) => (
            <motion.a
              key={i}
              href={`https://${link}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white/80 transition-colors group"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <ExternalLink className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
              LinkedIn
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <motion.button
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-indigo-500/20 rounded-xl transition-all ring-1 ring-white/20 hover:ring-indigo-500/50 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Experience
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white/70 hover:text-white bg-transparent hover:bg-white/5 rounded-xl transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Download Resume
          </motion.button>
        </motion.div>
      </div>

      {/* Profile Image Section */}
      {data.image && <ProfileImage src={data.image} alt={data.name} />}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/50 text-xs uppercase tracking-widest">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            whileHover={{ borderColor: "rgba(99, 102, 241, 0.6)" }}
          >
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-indigo-400 to-transparent rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
