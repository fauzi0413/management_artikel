"use client"
import { useEffect, useState } from "react";
import {FaSun, FaMoon} from "react-icons/fa";

function ThemeChange() {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const saveTheme = localStorage.getItem("theme");
        if (saveTheme) {
            setDarkMode(saveTheme === "dark");
        }
    },[])
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    },[darkMode])
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
  return (
    <button id="theme-toggle" className='theme-switcher' onClick={toggleTheme}>
        {darkMode ? <><FaSun /> <span>Light</span></> : <><FaMoon /> <span>Dark</span></>}
    </button>
  )
}

export default ThemeChange