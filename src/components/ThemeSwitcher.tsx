"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/data/site";

const THEMES: Theme[] = ["orange", "pink", "purple"];
const THEME_CLASSES = THEMES.map((t) => `theme-${t}`);

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const site = document.getElementById("site");
  if (!site) return;
  site.classList.remove(...THEME_CLASSES);
  site.classList.add(`theme-${theme}`);
  site.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("dfly-theme", { detail: theme }));
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("orange");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("dfly-theme");
    const initial = saved && (THEMES as string[]).includes(saved) ? (saved as Theme) : "orange";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const select = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dfly-theme", t);
    }
  };

  return (
    <div className="site-nav__themes">
      {THEMES.map((t) => (
        <div
          key={t}
          className={theme === t ? "active" : ""}
          onClick={() => select(t)}
          aria-label={`${t} theme`}
        />
      ))}
    </div>
  );
}