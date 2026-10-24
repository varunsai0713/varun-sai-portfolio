import { useState, useEffect } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.jsx";
const Navbar = ({ theme, toggleTheme, resumePath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  return <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-xs border-b border-zinc-200/80 dark:border-zinc-800/80 py-3" : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xs border-b border-transparent py-4"}`}
  >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {
    /* Brand Logo */
  }
          <a
    href="#hero"
    className="flex items-center gap-2 group font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
  >
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-sm font-semibold group-hover:scale-105 transition-transform">
              VS
            </span>
            <span className="text-base font-semibold tracking-tight">Varun Sai</span>
          </a>

          {
    /* Desktop Nav Links */
  }
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {navLinks.map((link) => <li key={link.name}>
                  <a
    href={link.href}
    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors py-1"
  >
                    {link.name}
                  </a>
                </li>)}
            </ul>

            <div className="flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              {
    /* Theme Toggle */
  }
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

              {
    /* Resume Download CTA */
  }
              <a
    href={resumePath}
    download="Varun_Sai_Resume.pdf"
    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
    title="Download Varun Sai's Resume (PDF)"
  >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {
    /* Mobile Right Controls */
  }
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
    type="button"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    aria-expanded={mobileMenuOpen}
    aria-label="Toggle navigation menu"
    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
  >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {
    /* Mobile Drawer Menu */
  }
      {mobileMenuOpen && <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-150">
          <ul className="flex flex-col space-y-3 font-medium text-zinc-700 dark:text-zinc-300 mb-4">
            {navLinks.map((link) => <li key={link.name}>
                <a
    href={link.href}
    onClick={handleLinkClick}
    className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
  >
                  {link.name}
                </a>
              </li>)}
          </ul>
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <a
    href={resumePath}
    download="Varun_Sai_Resume.pdf"
    onClick={handleLinkClick}
    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
  >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>}
    </header>;
};
export {
  Navbar
};
