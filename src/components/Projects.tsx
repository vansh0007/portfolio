import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, ArrowRight, Zap, Users, TrendingUp, Shield } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  impact: string;
  category: string;
  link: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Projects({ data }: { data: Project[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Add emojis to categories
  const categoryEmojis: { [key: string]: string } = {
    All: "✨",
    Enterprise: "🏢",
    Fintech: "💳",
    Product: "🚀",
    "Web App": "🌐",
    Infrastructure: "⚙️",
  };

  const categories = ["All", ...new Set(data.map((p) => p.category))];
  const filteredProjects =
    selectedCategory === "All"
      ? data
      : data.filter((p) => p.category === selectedCategory);

  return (
    <section className="relative min-h-screen py-24">
      {/* Background gradient elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl space-y-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center"
        >
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">
              🎯 Featured Work
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
              Game-Changing Projects
            </span>
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building solutions that move millions. From payment systems to enterprise platforms—
            <span className="text-indigo-300 font-semibold">each project delivers measurable impact</span>
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedCategory(category)}
              variants={itemVariants}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50 scale-105"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              } border border-white/10 hover:border-white/30`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{categoryEmojis[category] || "•"}</span>
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          layout
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer h-full"
            >
              {/* Project Card */}
              <motion.div
                className="space-y-6 h-full flex flex-col"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <motion.div
                  className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-all duration-300"
                  whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  {/* Gradient border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 opacity-0"
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === project.id ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40" />

                  {/* Overlay with content on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm flex flex-col justify-between p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top section with category badge */}
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : -10,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <span className="px-3 py-1 rounded-full bg-indigo-500/80 text-white text-xs font-bold">
                        {categoryEmojis[project.category]} {project.category}
                      </span>
                    </motion.div>

                    {/* Bottom section */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          y: hoveredId === project.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/95 text-sm leading-relaxed mb-4 font-medium">
                          {project.description}
                        </p>
                        <motion.button
                          className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors group/btn"
                          whileHover={{ gap: 12 }}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Impact Badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-indigo-400/60 rounded-full px-4 py-2 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0.8,
                      scale: hoveredId === project.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-indigo-300">
                      {project.impact}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 group-hover:from-indigo-300 group-hover:to-purple-200 transition-all duration-300"
                      animate={{ 
                        color: hoveredId === project.id ? "#a5f3fc" : "#ffffff" 
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/50 font-medium mt-2 group-hover:text-white/70 transition-colors"
                      whileHover={{ color: "#ffffff" }}
                    >
                      {project.subtitle}
                    </motion.p>
                  </div>

                  {/* Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                  >
                    {project.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        variants={itemVariants}
                        className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40 hover:border-indigo-500/80 hover:bg-indigo-500/30 transition-all"
                        whileHover={{ scale: 1.08 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Category & Link - Bottom */}
                  <motion.div
                    className="flex items-center justify-between pt-4 mt-auto border-t border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-200 font-semibold transition-colors group/link"
                      whileHover={{ gap: 8, x: 4 }}
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:rotate-45 transition-transform" />
                      Explore
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="pt-16 text-center space-y-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                Curious about what's next? 🚀
              </span>
            </motion.h3>
            <motion.p 
              className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's collaborate on your next big idea. Whether you need a payment system that handles millions, a platform that scales, or just someone who actually enjoys debugging at midnight.
            </motion.p>
          </div>

          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-2xl hover:shadow-indigo-500/60 transition-shadow border border-indigo-400/30 hover:border-indigo-400/70"
            whileHover={{ scale: 1.08, gap: 12 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span>Let's Build Something Amazing</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
