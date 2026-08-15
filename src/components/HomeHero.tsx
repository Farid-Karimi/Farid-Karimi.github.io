"use client";

import { useState } from "react";
import { hero, site } from "@/data/content";
import ArrowIcon from "./ArrowIcon";
import GrainientBackground from "./GrainientBackground";

export default function HomeHero() {
  const [popupOpen, setPopupOpen] = useState(false);

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
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="home-hero__sub">
        <p className="p">{hero.subtitle}</p>
        <p className="label">{hero.statusLine}</p>
      </div>
      <div className="home-hero__toast">
        <button className="a-div cta" onClick={() => setPopupOpen(true)}>
          <span className="label">Get in touch</span>
          <ArrowIcon />
        </button>
      </div>
      {popupOpen ? (
        <div className="home-hero__popup" role="dialog" aria-modal="true" onClick={() => setPopupOpen(false)}>
          <div className="home-hero__popup--content" onClick={(e) => e.stopPropagation()}>
            <p className="h3">{site.name}</p>
            <p className="p">{hero.subtitle}</p>
            <p className="p">{hero.statusLine}</p>
            <a className="a-div cta" href={`mailto:${site.email}`}>
              <span className="label">{site.email}</span>
              <ArrowIcon />
            </a>
            <button className="a-div cta" onClick={() => setPopupOpen(false)}>
              <span className="label">Close</span>
              <ArrowIcon />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}