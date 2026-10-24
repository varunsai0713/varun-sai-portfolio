import { useEffect, useState } from "react";
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("varun-portfolio-theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("varun-portfolio-theme", theme);
  }, [theme]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const stored = localStorage.getItem("varun-portfolio-theme");
      if (!stored) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  };
  return { theme, toggleTheme, setTheme };
}
export {
  useTheme
};
