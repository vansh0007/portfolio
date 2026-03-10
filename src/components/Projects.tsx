import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

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
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
              Featured Projects
            </span>
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Showcasing high-impact solutions that shaped how millions interact with
            digital platforms. Each project represents innovation, scalability, and
            exceptional user experience.
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
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              } border border-white/10 hover:border-white/30`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          layout
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              {/* Project Card */}
              <div className="space-y-6">
                {/* Image Container */}
                <motion.div
                  className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-white/5 border border-white/10"
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
                      scale: hoveredId === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30" />

                  {/* Overlay with content on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <motion.button
                      className="inline-flex items-center gap-2 text-white/80 hover:text-white group transition-colors"
                      whileHover={{ gap: 8 }}
                    >
                      Explore Project
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>

                  {/* Impact Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0.7,
                      scale: hoveredId === project.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs font-semibold text-indigo-300">
                      {project.impact}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300"
                      animate={{ color: hoveredId === project.id ? "#a5f3fc" : "#ffffff" }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-white/50 font-medium mt-2">
                      {project.subtitle}
                    </p>
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
                        className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Category & Link */}
                  <motion.div
                    className="flex items-center justify-between pt-4 border-t border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="text-sm text-white/40 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                      whileHover={{ gap: 8 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="pt-12 text-center space-y-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                Ready to work together?
              </span>
            </h3>
            <p className="text-white/50 max-w-xl mx-auto">
              Let's create something extraordinary. Reach out to discuss how we can
              transform your vision into reality.
            </p>
          </div>

          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow"
            whileHover={{ scale: 1.05, gap: 8 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
