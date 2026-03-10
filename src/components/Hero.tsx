import { motion } from "motion/react";
import {
  Download,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import ProfileImage from "./ProfileImage";

export default function Hero({ data }: { data: any }) {
  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between min-h-[80vh] gap-12 lg:gap-16">
      <div className="flex-1 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 rounded-full ring-1 ring-indigo-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Available for new opportunities
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
          {data.name}
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-white/60">
          {data.title}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-2xl text-lg leading-relaxed text-white/50"
      >
        {data.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-4 text-sm text-white/40"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {data.location}
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {data.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {data.phone}
        </div>
        {data.links.map((link: string, i: number) => (
          <a
            key={i}
            href={`https://${link}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            LinkedIn
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap gap-4 pt-4"
      >
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-105 active:scale-95 ring-1 ring-white/20">
          View Experience
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white/70 hover:text-white bg-transparent hover:bg-white/5 rounded-xl transition-all hover:scale-105 active:scale-95">
          <Download className="w-4 h-4" />
          Download Resume
        </button>
      </motion.div>
      </div>

      {/* Profile Image Section */}
      {data.image && (
        <ProfileImage src={data.image} alt={data.name} />
      )}
    </section>
  );
}
