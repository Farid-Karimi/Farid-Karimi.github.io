"use client";

import { useEffect, useState } from "react";
import Grainient from "./Grainient";
import themes from "@/content/themes.json";
import type { Theme } from "@/data/site";

const THEME_COLORS: Record<Theme, { color1: string; color2: string; gamma: number; contrast: number }> = {
  starboy: { color1: themes.starboy.background1, color2: themes.starboy.background2, gamma: themes.starboy.gamma, contrast: themes.starboy.contrast },
  dawnfm: { color1: themes.dawnfm.background1, color2: themes.dawnfm.background2, gamma: themes.dawnfm.gamma, contrast: themes.dawnfm.contrast },
  mdm: { color1: themes.mdm.background1, color2: themes.mdm.background2, gamma: themes.mdm.gamma, contrast: themes.mdm.contrast },
  afterhours: { color1: themes.afterhours.background1, color2: themes.afterhours.background2, gamma: themes.afterhours.gamma, contrast: themes.afterhours.contrast },
};

const LEGACY_MAP: Record<string, Theme> = {
  orange: "starboy",
  pink: "dawnfm",
  purple: "mdm",
};

export default function GrainientBackground() {
  const [theme, setTheme] = useState<Theme>("starboy");

  useEffect(() => {
    const saved = window.localStorage.getItem("dfly-theme");
    const mapped = saved ? LEGACY_MAP[saved] : undefined;
    if (mapped || saved === "starboy" || saved === "dawnfm" || saved === "mdm" || saved === "afterhours") {
      setTheme((mapped || saved) as Theme);
    }
    const onTheme = (e: Event) => {
      const t = (e as CustomEvent<string>).detail as Theme;
      if (t) setTheme(t);
    };
    window.addEventListener("dfly-theme", onTheme);
    return () => window.removeEventListener("dfly-theme", onTheme);
  }, []);

  const colors = THEME_COLORS[theme];

  return (
    <div className="grainient-bg" aria-hidden="true">
      <Grainient
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color1}
        timeSpeed={0.4}
        colorBalance={-0.07}
        warpStrength={0}
        warpFrequency={5.1}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.08}
        grainScale={2.0}
        grainAnimated={false}
        contrast={colors.contrast}
        gamma={colors.gamma}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.95}
      />
      <div className="grainient-bg__scrim" />
    </div>
  );
}