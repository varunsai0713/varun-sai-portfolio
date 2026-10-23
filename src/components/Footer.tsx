import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { PortfolioData } from '../data/portfolio.ts';

interface FooterProps {
  identity: PortfolioData['identity'];
}

export const Footer: React.FC<FooterProps> = ({ identity }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Identity & Copyright */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs font-bold">
                VS
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {identity.name}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © 2026 {identity.name}. Built with Java, Spring Boot & React mindset.
            </p>
          </div>

          {/* Social Links & GitHub button (replaced Back to top as requested) */}
          <div className="flex items-center gap-3">
            <a
              href={identity.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Varun Sai on LinkedIn"
              className="p-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${identity.email}`}
              aria-label="Send email to Varun Sai"
              className="p-2 text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Replaced Back to Top with GitHub button */}
            <a
              href={identity.githubUrl || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Varun Sai on GitHub (opens in new tab)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors ml-1 shadow-2xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
