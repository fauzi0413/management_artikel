"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeChange() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-mode");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Prevent hydration mismatch
  if (!mounted) return <div className="theme-switcher-placeholder" />;

  return (
    <button
      className={`modern-theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      <div className="toggle-thumb">
        {darkMode ? <FaMoon className="moon-icon" /> : <FaSun className="sun-icon" />}
      </div>
    </button>
  );
}

export default ThemeChange;