import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Projects } from './components/Projects.tsx';
import { Education } from './components/Education.tsx';
import { Learning } from './components/Learning.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { useTheme } from './hooks/useTheme.ts';
import { portfolioData } from './data/portfolio.ts';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors duration-200">
      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      {/* 1. Sticky Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        resumePath={portfolioData.identity.resumePath}
      />

      {/* 2. Hero Section */}
      <Hero identity={portfolioData.identity} />

      {/* Main Semantic Landmark */}
      <main id="main-content">
        {/* 3. About Section */}
        <About about={portfolioData.about} />

        {/* 4. Skills Section */}
        <Skills skills={portfolioData.skills} />

        {/* 5. Experience Section */}
        <Experience experience={portfolioData.experience} />

        {/* 6. Projects Section */}
        <Projects projects={portfolioData.projects} />

        {/* 7. Education Section */}
        <Education education={portfolioData.education} />

        {/* 8. Currently Building / Learning Section */}
        <Learning items={portfolioData.currentlyLearning} />

        {/* 9. Contact Section */}
        <Contact identity={portfolioData.identity} />
      </main>

      {/* 10. Footer Section */}
      <Footer identity={portfolioData.identity} />
    </div>
  );
}
