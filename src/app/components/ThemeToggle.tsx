"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-3 rounded-full bg-light-accent dark:bg-dark-border bg-light-blue dark:hover:bg-dark-accent hover:bg-neon-green transition-colors"
    >
      {isDark ? (
        <Image
          src="/assets/icons/sun-svgrepo-com.svg"
          alt="Light Mode"
          width={34}
          height={34}
        />
      ) : (
        <Image
          src="/assets/icons/dark-mode-night-moon-svgrepo-com.svg"
          alt="Dark Mode"
          width={34}
          height={34}
        />
      )}
    </button>
  );
}
