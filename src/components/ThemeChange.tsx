"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeChange() {
  const [mounted, setMounted] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    const isDark =
      savedTheme === "dark";

    setDarkMode(isDark);

    if (isDark) {
      document.body.classList.add(
        "dark-mode"
      );
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.body.classList.add(
        "dark-mode"
      );
      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
    >
      {darkMode ? (
        <>
          <FaSun />
          <span>Light</span>
        </>
      ) : (
        <>
          <FaMoon />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

export default ThemeChange;