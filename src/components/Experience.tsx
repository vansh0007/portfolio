import { motion } from "motion/react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Experience({ data }: { data: any[] }) {
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
          Experience
        </h2>
        <div className="w-12 h-1 bg-indigo-500 rounded-full" />
      </motion.div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {data.map((job, index) => (
          <ExperienceCard key={job.company} job={job} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ job, index }: { job: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0f] text-white/50 group-hover:text-indigo-400 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10">
        <Briefcase className="w-4 h-4" />
      </div>

      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-xl font-bold text-white/90">{job.role}</h3>
          <div className="flex items-center gap-2">
            {job.logo && (
              <img
                src={job.logo}
                alt={job.company}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div className="text-indigo-400 font-medium">{job.company}</div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/40 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {job.dates}
            </span>
            {job.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs font-medium text-white/30 hover:text-white/70 transition-colors mb-4"
        >
          {isExpanded ? "Show Less" : "Show Details"}
          {isExpanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <ul className="space-y-3 text-sm text-white/60 list-none">
            {job.bullets.map((bullet: string, i: number) => {
              // Highlight numbers and percentages
              const highlightedBullet = bullet.replace(
                /(\d+%?|\$\d+(\.\d+)?[MBK]?)/g,
                '<span class="text-indigo-300 font-semibold bg-indigo-500/10 px-1 rounded">$1</span>',
              );

              return (
                <li
                  key={i}
                  className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-indigo-500/50 before:rounded-full"
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: highlightedBullet }}
                  />
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
