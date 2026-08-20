import themes from "@/content/themes.json";

const MODE_KEYS = Object.keys(themes) as (keyof typeof themes)[];

const rootVars = MODE_KEYS.map((key) => `--mode-${key}:${themes[key].accent};`).join("");

const css = MODE_KEYS.map((key) => {
  const t = themes[key];
  return `:root[data-theme="${key}"]{--theme-bg:${t.background1};--theme-fg:${t.foreground};--theme-contrast:${t.accent};--theme-display-name:"${t.font}", "NON Natural Grotesk";--theme-display-mult:${t.fontScale};--theme-scrim:${t.scrim};--theme-tracking:${t.tracking}px;--theme-tracking-mobile:${t.trackingMobile}px;}`;
}).join("");

export default function ThemeStyles() {
  return <style id="theme-styles" dangerouslySetInnerHTML={{ __html: `:root{${rootVars}}${css}` }} />;
}