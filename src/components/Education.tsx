import { motion } from "motion/react";
import { GraduationCap, Award } from "lucide-react";

export default function Education({ data }: { data: any[] }) {
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
          Education & Certifications
        </h2>
        <div className="w-12 h-1 bg-indigo-500 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm group flex gap-4"
          >
            <div className="shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white/90 mb-1">
                {edu.company}
              </h3>
              <p className="text-sm text-indigo-300 font-medium mb-2">
                {edu.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Award className="w-3 h-3" />
                Degree Completed
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
