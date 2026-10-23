import React from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface LearningProps {
  items: string[];
}

export const Learning: React.FC<LearningProps> = ({ items }) => {
  // Acceptance requirement: Hide the whole section if empty
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="learning"
      aria-labelledby="learning-heading"
      className="py-14 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Continuous Growth</span>
            </div>
            <h2
              id="learning-heading"
              className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Currently Building & Learning
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Topics and technical domains I am actively exploring and sharpening outside daily work.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 max-w-xl">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
