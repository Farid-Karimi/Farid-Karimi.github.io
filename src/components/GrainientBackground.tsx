"use client";

import { useEffect, useState } from "react";
import Grainient from "./Grainient";
import type { Theme } from "@/data/site";

const THEME_COLORS: Record<Theme, { color2: string }> = {
  orange: { color2: "#ce4012" },
  pink: { color2: "#c21f9b" },
  purple: { color2: "#3f1ad1" },
};

export default function GrainientBackground() {
  const [theme, setTheme] = useState<Theme>("orange");

  useEffect(() => {
    const saved = window.localStorage.getItem("dfly-theme");
    if (saved === "pink" || saved === "purple" || saved === "orange") setTheme(saved);
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
        color1="#000000"
        color2={colors.color2}
        color3="#000000"
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
        contrast={1.5}
        gamma={0.65}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.95}
      />
      <div className="grainient-bg__scrim" />
    </div>
  );
}