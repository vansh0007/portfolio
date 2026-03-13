import { motion } from "motion/react";
import {
  Code2,
  Database,
  Layout,
  Wrench,
  GitBranch,
  Zap,
  Star,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function Skills({ data }: { data: any }) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Define proficiency levels with aligned website colors
  const proficiencyLevels: {
    [key: string]: { level: string; color: string; emoji: string };
  } = {
    Expert: {
      level: "Expert",
      color: "from-indigo-500 to-purple-500",
      emoji: "⚡",
    },
    Advanced: {
      level: "Advanced",
      color: "from-cyan-500 to-blue-500",
      emoji: "🔥",
    },
    Proficient: {
      level: "Proficient",
      color: "from-purple-500/80 to-indigo-500/80",
      emoji: "✨",
    },
  };

  // Determine proficiency level for each skill
  const getSkillProficiency = (item: string): string => {
    const expertSkills = [
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "Spring Boot",
      "Spring Framework",
      "Node",
    ];
    const advancedSkills = [
      "AWS",
      "Docker",
      "GraphQL",
      "Kafka",
      "Apache Spark",
      "Angular",
    ];

    if (expertSkills.includes(item)) return "Expert";
    if (advancedSkills.includes(item)) return "Advanced";
    return "Proficient";
  };

  const categories = [
    {
      title: "Programming Languages",
      icon: Code2,
      items: data.programming,
      id: "programming",
      gradient: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400",
    },
    {
      title: "Web & Frontend",
      icon: Layout,
      items: data.web,
      id: "web",
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Frameworks & Libraries",
      icon: Zap,
      items: data.technologies,
      id: "technologies",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-400",
    },
    {
      title: "Databases & Storage",
      icon: Database,
      items: data.storage,
      id: "storage",
      gradient: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "DevOps & Tools",
      icon: Wrench,
      items: data.tools,
      id: "tools",
      gradient: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-400",
    },
    {
      title: "Methodologies",
      icon: GitBranch,
      items: data.methodologies,
      id: "methodologies",
      gradient: "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-400",
    },
  ];

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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative space-y-20">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"
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

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 text-center"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">
            🛠️ Expertise & Mastery
          </span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
            Skills & Proficiencies
          </span>
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg text-white/50 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-indigo-300 font-semibold">10+ years</span> of hands-on expertise across 
          <span className="text-indigo-300 font-semibold"> enterprise-scale systems</span>, cloud infrastructure, 
          and cutting-edge development practices. Each skill is battle-tested in production.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              variants={skillVariants}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group relative"
            >
              {/* Card Background with Gradient Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{
                  bgGradient:
                    hoveredCategory === category.id
                      ? `linear-gradient(135deg, ${category.gradient})`
                      : "transparent",
                }}
              />

              {/* Main Card */}
              <motion.div
                className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300 overflow-hidden group/card"
                whileHover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  y: -8,
                }}
              >
                {/* Animated background glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: hoveredCategory === category.id 
                      ? `radial-gradient(circle at var(--mouse-x), rgba(255,255,255,0.1) 0%, transparent 80%)`
                      : "transparent"
                  }}
                  style={{
                    "--mouse-x": "50%",
                    "--mouse-y": "50%",
                  } as any}
                />

                {/* Floating particles effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100"
                  animate={{
                    opacity: hoveredCategory === category.id ? 0.5 : 0
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-indigo-400"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} border border-white/10 shadow-lg shadow-indigo-500/20 group-hover/card:shadow-indigo-500/40 transition-shadow`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 360,
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-6 h-6 ${category.iconColor}`} />
                  </motion.div>

                  <motion.div
                    animate={{
                      opacity: hoveredCategory === category.id ? 1 : 0,
                      scale: hoveredCategory === category.id ? 1 : 0.8,
                      rotate: hoveredCategory === category.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6 leading-tight relative z-10 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-indigo-300 group-hover/card:to-purple-200 transition-all"
                  animate={{
                    color: hoveredCategory === category.id ? "transparent" : "white"
                  }}
                >
                  {category.title}
                </motion.h3>

                {/* Skills Grid */}
                <motion.div
                  className="space-y-3 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {category.items.map((item: string, idx: number) => {
                    const proficiencyLevel = getSkillProficiency(item);
                    const proficiency = proficiencyLevels[proficiencyLevel];

                    return (
                      <motion.div
                        key={idx}
                        variants={skillVariants}
                        onClick={() =>
                          setSelectedSkill(
                            selectedSkill === item ? null : item
                          )
                        }
                        className="group/skill cursor-pointer"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <motion.span 
                            className="text-white/80 font-medium text-sm group-hover/skill:text-white group-hover/skill:font-semibold transition-all"
                            whileHover={{ color: "#ffffff" }}
                          >
                            {item}
                          </motion.span>
                          <motion.div
                            className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${proficiency.color} text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 group-hover/skill:shadow-indigo-500/50 transition-shadow`}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <span className="text-sm">{proficiency.emoji}</span>
                            {proficiency.level}
                          </motion.div>
                        </div>

                        {/* Proficiency Bar with Glow */}
                        <motion.div
                          className="h-2 rounded-full bg-white/10 overflow-hidden relative group-hover/skill:h-3 transition-all shadow-inner"
                          whileHover={{ height: 12 }}
                        >
                          {/* Animated glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full opacity-0 group-hover/skill:opacity-100"
                            animate={{
                              boxShadow: hoveredCategory === category.id ? `0 0 15px ${proficiency.color}` : "none"
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Progress bar */}
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${proficiency.color} shadow-lg`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{
                              duration: 1.2,
                              delay: idx * 0.06,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            viewport={{ once: true }}
                            animate={{
                              boxShadow: hoveredCategory === category.id 
                                ? `0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.4)`
                                : "0 0 10px rgba(99, 102, 241, 0.3)"
                            }}
                          />
                        </motion.div>

                        {/* Proficiency percentage on hover */}
                        <motion.div
                          className="flex justify-end mt-1"
                          animate={{
                            opacity: hoveredCategory === category.id ? 1 : 0,
                            height: hoveredCategory === category.id ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span 
                            className="text-xs text-indigo-300 font-semibold"
                            animate={{
                              opacity: hoveredCategory === category.id ? 1 : 0,
                            }}
                          >
                            {proficiencyLevel === "Expert" ? "95%" : proficiencyLevel === "Advanced" ? "85%" : "75%"}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Count Badge */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/5 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="text-xs text-white/50 uppercase tracking-widest flex items-center gap-1"
                      whileHover={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      Total Skills
                    </motion.span>
                    <motion.div
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {category.items.length}
                      </motion.span>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {[
          { label: "Years Experience", value: "10+", emoji: "⚡" },
          { label: "Technologies", value: `${data.technologies.length}+`, emoji: "🚀" },
          { label: "Languages", value: `${data.programming.length}`, emoji: "💻" },
          { label: "Proficient Areas", value: "6", emoji: "🎯" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 text-center group/stat hover:border-indigo-500/50 transition-all relative overflow-hidden"
            whileHover={{ 
              y: -8, 
              borderColor: "rgba(99, 102, 241, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.12)"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
          >
            {/* Background glow on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl transition-opacity duration-500"
              animate={{
                opacity: idx % 2 === 0 ? [0.1, 0.3, 0.1] : [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                className="text-4xl mb-2"
                animate={{ 
                  scale: [1, 1.1, 1], 
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  delay: idx * 0.2 
                }}
              >
                {stat.emoji}
              </motion.div>

              <motion.div
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <motion.span
                  display="inline-block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {stat.value}
                </motion.span>
              </motion.div>

              <motion.p 
                className="text-xs text-white/50 uppercase tracking-widest group-hover/stat:text-white/70 transition-colors"
                whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                {stat.label}
              </motion.p>

              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-indigo-400/0 group-hover/stat:border-indigo-400/50 transition-colors"
                animate={{
                  boxShadow: idx % 2 === 0 
                    ? "inset 0 0 30px rgba(99, 102, 241, 0)" 
                    : "inset 0 0 30px rgba(99, 102, 241, 0)"
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
