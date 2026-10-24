import { SectionHeading } from "./SectionHeading.jsx";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
const Education = ({ education }) => {
  return <section id="education" aria-labelledby="education-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
    eyebrow="05. Education"
    title="Academic background"
    description="Formal foundation in engineering, mathematics, and computer sciences."
  />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {education.map((item) => <div
    key={item.institution}
    className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs flex flex-col justify-between"
  >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {item.institution}
                    </h3>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {item.degree}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export {
  Education
};
