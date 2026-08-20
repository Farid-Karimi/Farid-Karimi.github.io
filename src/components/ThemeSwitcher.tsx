"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/data/site";

const THEMES: Theme[] = ["starboy", "dawnfm", "mdm", "afterhours"];
const THEME_LABELS: Record<Theme, string> = {
  starboy: "Starboy",
  dawnfm: "DawnFM",
  mdm: "MDM",
  afterhours: "After Hours",
};
const LEGACY_MAP: Record<string, Theme> = {
  orange: "starboy",
  pink: "dawnfm",
  purple: "mdm",
};
const THEME_CLASSES = THEMES.map((t) => `theme-${t}`);

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  document.documentElement.dataset.theme = theme;
  const site = document.getElementById("site");
  if (!site) return;
  site.classList.remove(...THEME_CLASSES);
  site.classList.add(`theme-${theme}`);
  window.dispatchEvent(new CustomEvent("dfly-theme", { detail: theme }));
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("starboy");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("dfly-theme");
    const mapped = saved ? LEGACY_MAP[saved] : undefined;
    const initial = mapped || (THEMES as string[]).includes(saved ?? "") ? (saved as Theme) : "starboy";
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
          aria-label={`${THEME_LABELS[t]} theme`}
        />
      ))}
    </div>
  );
}