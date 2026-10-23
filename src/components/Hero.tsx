import React, { useState } from 'react';
import { Mail, Linkedin, Github, ArrowRight, FileDown, MapPin } from 'lucide-react';
import { PortfolioData } from '../data/portfolio.ts';
import { formatLocation, isPlaceholderLink } from '../utils/portfolio.ts';
import profilePhoto from '../assets/images/IMG_5095[1].jpg';

interface HeroProps {
  identity: PortfolioData['identity'];
}

export const Hero: React.FC<HeroProps> = ({ identity }) => {
  const displayLocation = formatLocation(identity.cityPlaceholder, identity.location);
  const hasGithub = !isPlaceholderLink(identity.githubUrl);

  // Profile photo state with fallback
  const [photoSrc, setPhotoSrc] = useState<string>(
    identity.profilePhoto || profilePhoto
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="pt-24 pb-16 md:pt-32 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Side-by-side flex container: photo is on the right side of the heading and bio */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-8 md:gap-10 lg:gap-12">
        {/* Left Column: Heading and Info */}
        <div className="flex-1 min-w-0 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{identity.availabilityStatus}</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]"
          >
            Hi, I&apos;m <span className="text-zinc-900 dark:text-zinc-100">{identity.name}</span>.
          </h1>

          {/* Title */}
          <p className="mt-3 text-base sm:text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300">
            {identity.title}
          </p>

          {/* One-line Value Statement */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            {identity.tagline}
          </p>

          {/* Location indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>{displayLocation}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            <a
              href={identity.resumePath}
              download="Varun_Sai_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Download Resume"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Icon Social Links */}
          <div className="mt-7 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
              Connect:
            </span>

            {/* LinkedIn */}
            <a
              href={identity.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Varun Sai on LinkedIn (opens in new tab)"
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${identity.email}`}
              aria-label={`Send email to ${identity.email}`}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>

            {/* GitHub */}
            {hasGithub ? (
              <a
                href={identity.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Varun Sai on GitHub (opens in new tab)"
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            ) : (
              <span
                title="GitHub link will be added upon repository publication"
                className="p-2 rounded-lg text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                aria-label="GitHub link pending repository publication"
              >
                <Github className="w-5 h-5" />
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Only the pure profile image right on the side of "Hi, I'm Varun Sai" */}
        <div className="shrink-0 w-44 sm:w-52 md:w-60 lg:w-68 self-center sm:self-start mt-4 sm:mt-1">
          <div className="w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg bg-zinc-100 dark:bg-zinc-900">
            <img
              src={photoSrc}
              alt={identity.name}
              onError={() => {
                setPhotoSrc('/profile-placeholder.svg');
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
