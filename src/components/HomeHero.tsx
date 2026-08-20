"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/content";
import GrainientBackground from "./GrainientBackground";

const UNLOCK_KEY = "dfly-unlocked";
const UNLOCK_TAPS = 5;

export default function HomeHero() {
  const chars = hero.headline.split("");
  const [justUnlocked, setJustUnlocked] = useState(false);
  const tapCount = useRef(0);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(resetTimer.current);
  }, []);

  const onTitleClick = () => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(UNLOCK_KEY) === "1") return;
    window.clearTimeout(resetTimer.current);
    tapCount.current += 1;
    if (tapCount.current >= UNLOCK_TAPS) {
      tapCount.current = 0;
      window.localStorage.setItem(UNLOCK_KEY, "1");
      window.dispatchEvent(new CustomEvent("dfly-unlocked"));
      setJustUnlocked(true);
      window.setTimeout(() => setJustUnlocked(false), 3200);
      return;
    }
    resetTimer.current = window.setTimeout(() => {
      tapCount.current = 0;
    }, 1600);
  };

  return (
    <section id="hero" className="home-hero layout-block">
      <GrainientBackground />
      <div className="home-hero__title" onClick={onTitleClick}>
        <div>
          {chars.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className={char === " " ? "char char-space" : "char"}
              style={{ animationDelay: `${400 + i * 45}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
      {justUnlocked && (
        <div className="home-hero__unlocked">
          <span className="label">Modes unlocked — open the menu</span>
        </div>
      )}
      <div className="home-hero__sub">
        <p className="p">{hero.subtitle}</p>
        <p className="label">{hero.statusLine}</p>
      </div>
    </section>
  );
}