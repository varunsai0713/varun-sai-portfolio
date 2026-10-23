import React from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { ExperienceItem } from '../data/portfolio.ts';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="03. Work Experience"
          title="Professional engineering history"
          description="Hands-on experience delivering production applications, REST APIs, and data solutions."
        />

        <div className="relative pl-6 md:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-12 max-w-4xl">
          {experience.map((item, index) => (
            <div key={item.company + item.role} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                      <Briefcase className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
