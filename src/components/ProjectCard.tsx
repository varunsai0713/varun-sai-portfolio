import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { ProjectItem } from '../data/portfolio.ts';
import { hasActionableLinks } from '../utils/portfolio.ts';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { hasGithub, hasLive, hasAny } = hasActionableLinks(project);

  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {project.role} • {project.year}
          </span>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 italic">
        {project.tagline}
      </p>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bullet Points */}
      <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 flex-1">
        {project.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Card Action Buttons (Rule: hide a button if its link is a placeholder) */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        {hasAny ? (
          <div className="flex items-center gap-3">
            {hasGithub && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label={`View source code for ${project.title} (opens in new tab)`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {hasLive && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-2xs"
                aria-label={`Open live demo for ${project.title} (opens in new tab)`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
            <Code className="w-3.5 h-3.5" />
            <span>Project architecture & code ready for walkthrough</span>
          </div>
        )}
      </div>
    </article>
  );
};
