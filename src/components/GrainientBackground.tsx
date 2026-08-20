"use client";

import { useEffect, useState } from "react";
import Grainient from "./Grainient";
import type { Theme } from "@/data/site";

const THEME_COLORS: Record<Theme, { color1: string; color2: string; gamma: number; contrast: number }> = {
  starboy: { color1: "#ca0836", color2: "#11072c", gamma: 1.2, contrast: 1.0 },
  dawnfm: { color1: "#133440", color2: "#020406", gamma: 1.0, contrast: 1.2 },
  mdm: { color1: "#4c2211", color2: "#090e0c", gamma: 1.2, contrast: 1.0 },
  afterhours: { color1: "#a66d38", color2: "#090a0f", gamma: 1.0, contrast: 1.0 },
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