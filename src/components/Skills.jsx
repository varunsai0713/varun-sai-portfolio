import { SectionHeading } from "./SectionHeading.jsx";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  ActivitySquare
} from "lucide-react";
const Skills = ({ skills }) => {
  const getCategoryIcon = (title) => {
    switch (title.toLowerCase()) {
      case "languages":
        return <Code2 className="w-5 h-5 text-amber-500" />;
      case "frontend":
        return <Layout className="w-5 h-5 text-blue-500" />;
      case "backend":
        return <Server className="w-5 h-5 text-emerald-500" />;
      case "databases":
        return <Database className="w-5 h-5 text-cyan-500" />;
      case "cloud & devops":
        return <Cloud className="w-5 h-5 text-purple-500" />;
      case "concepts":
        return <Cpu className="w-5 h-5 text-rose-500" />;
      case "testing & monitoring":
        return <ActivitySquare className="w-5 h-5 text-teal-500" />;
      default:
        return <Code2 className="w-5 h-5 text-zinc-500" />;
    }
  };
  return <section id="skills" aria-labelledby="skills-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
    eyebrow="02. Technical Skills"
    title="Core stack and technical competencies"
    description="Technologies and tooling I actively develop with across the full software lifecycle."
  />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => <div
    key={category.title}
    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col"
  >
              {
    /* Category Header */
  }
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {category.title}
                </h3>
              </div>

              {
    /* Skills Chips */
  }
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill) => <span
    key={skill}
    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60"
  >
                    {skill}
                  </span>)}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export {
  Skills
};
