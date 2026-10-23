import React from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { PortfolioData } from '../data/portfolio.ts';
import { ShieldCheck, Cpu, Code, Layers } from 'lucide-react';

interface AboutProps {
  about: PortfolioData['about'];
}

export const About: React.FC<AboutProps> = ({ about }) => {
  const iconMap: Record<number, React.ReactNode> = {
    0: <Layers className="w-5 h-5 text-indigo-500" />,
    1: <Code className="w-5 h-5 text-blue-500" />,
    2: <Cpu className="w-5 h-5 text-emerald-500" />,
    3: <ShieldCheck className="w-5 h-5 text-amber-500" />,
  };

  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="01. About Me"
          title="Engineering reliable systems from API to UI"
          description="A summary of my background, focus areas, and technical foundation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Summary Paragraph */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {about.summary}
              </p>
            </div>
          </div>

          {/* Quick Facts Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {about.quickFacts.map((fact, index) => (
              <div
                key={fact.label}
                className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-2xs flex items-start gap-3.5"
              >
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 shrink-0">
                  {iconMap[index] || <Layers className="w-5 h-5" />}
                </div>
                <div>
                  <span className="block text-xs uppercase font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
                    {fact.label}
                  </span>
                  <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    {fact.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
