import { motion } from "motion/react";
import { Code2, Database, Layout, Wrench, GitBranch } from "lucide-react";

export default function Skills({ data }: { data: any }) {
  const categories = [
    { title: "Programming", icon: Code2, items: data.programming },
    { title: "Technologies", icon: Layout, items: data.technologies },
    { title: "Storage & DB", icon: Database, items: data.storage },
    { title: "Web", icon: Layout, items: data.web },
    { title: "Tools", icon: Wrench, items: data.tools },
    { title: "Methodologies", icon: GitBranch, items: data.methodologies },
  ];

  return (
    <section className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Skills & Expertise
        </h2>
        <div className="w-12 h-1 bg-indigo-500 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <category.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white/90">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium text-white/60 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
