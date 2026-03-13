import { motion } from "motion/react";
import {
  Code2,
  Database,
  Layout,
  Wrench,
  GitBranch,
  Zap,
  Cloud,
  Lock,
} from "lucide-react";

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  tools: string[];
}

const techCategories: TechCategory[] = [
  {
    name: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    tools: ["Java", "TypeScript", "Python", "JavaScript", "GO"],
  },
  {
    name: "Frameworks",
    icon: <Layout className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
    tools: ["React", "Spring Boot", "Node.js", "Vue", "Angular"],
  },
  {
    name: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    tools: ["MySQL", "PostgreSQL", "MongoDB", "Elasticsearch", "S3"],
  },
  {
    name: "DevOps & Tools",
    icon: <Wrench className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    tools: ["Docker", "Kubernetes", "AWS", "GIT", "CI/CD", "Maven"],
  },
  {
    name: "Architecture",
    icon: <GitBranch className="w-5 h-5" />,
    color: "from-indigo-500 to-purple-500",
    tools: ["Microservices", "REST APIs", "GraphQL", "Kafka", "Event-Driven"],
  },
  {
    name: "Cloud & Performance",
    icon: <Cloud className="w-5 h-5" />,
    color: "from-teal-500 to-blue-500",
    tools: ["AWS Lambda", "CloudFront", "Redis", "Apache Spark", "Hadoop"],
  },
];

export default function TechStack() {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-32 space-y-16">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-4 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">
            Tech Stack & Arsenal
          </span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          The cutting-edge tools & technologies I use to build scalable, high-performance solutions
        </p>
      </motion.div>

      {/* Tech Categories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {techCategories.map((category, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="group cursor-pointer"
          >
            <motion.div
              className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 absolute inset-0 transition-opacity duration-300`}
            />
            <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 space-y-4 h-full flex flex-col">
              {/* Icon & Title */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${category.color} w-fit transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className="text-white">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/40 transition-all">
                    {category.name}
                  </h3>
                </div>
                <span className="text-2xl">✨</span>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 flex-1">
                {category.tools.map((tool, toolIdx) => (
                  <span
                    key={toolIdx}
                    className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${category.color} bg-opacity-10 text-white/70 border border-white/10 group-hover:border-white/30 group-hover:text-white/90 transition-all duration-300`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fun Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Languages", value: "7+", icon: "🗣️" },
            { label: "Frameworks", value: "15+", icon: "🏗️" },
            { label: "Years Experience", value: "10+", icon: "⚡" },
            { label: "Projects Shipped", value: "50+", icon: "🚀" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 text-center space-y-3 backdrop-blur-sm transition-all group hover:bg-white/[0.05]"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div className="text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
