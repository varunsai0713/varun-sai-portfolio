import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../hooks/useTheme.ts';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, className = '' }) => {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
        theme === 'dark'
          ? 'bg-zinc-800/80 border-zinc-700 text-amber-400 hover:bg-zinc-700/80'
          : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
};
