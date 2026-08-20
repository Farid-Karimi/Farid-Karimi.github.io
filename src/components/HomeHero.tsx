"use client";

import { hero } from "@/data/content";
import GrainientBackground from "./GrainientBackground";

export default function HomeHero() {
  const chars = hero.headline.split("");

  return (
    <section id="hero" className="home-hero layout-block">
      <GrainientBackground />
      <div className="home-hero__title">
        <div>
          {chars.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="char"
              style={{ animationDelay: `${400 + i * 45}ms` }}
            >
{char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
      <div className="home-hero__sub">
        <p className="p">{hero.subtitle}</p>
        <p className="label">{hero.statusLine}</p>
      </div>
    </section>
  );
}