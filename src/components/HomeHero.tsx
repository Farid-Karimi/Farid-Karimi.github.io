"use client";

import { useState } from "react";
import { hero } from "@/data/hero";
import ArrowIcon from "./ArrowIcon";
import DragonflyScene from "./DragonflyScene";

export default function HomeHero() {
  const [popupOpen, setPopupOpen] = useState(false);

  const chars = hero.title.toUpperCase().split("");

  return (
    <section id="hero" className="home-hero layout-block">
      <DragonflyScene />
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
      <div className="home-hero__toast">
        <button className="a-div cta" onClick={() => setPopupOpen(true)}>
          <span className="label">Find out more</span>
          <ArrowIcon />
        </button>
      </div>
      {popupOpen ? (
        <div className="home-hero__popup" role="dialog" aria-modal="true" onClick={() => setPopupOpen(false)}>
          <div className="home-hero__popup--content" onClick={(e) => e.stopPropagation()}>
            <p className="h3">{hero.popup.title.replace(/___$/, "")}</p>
            <p className="p">{hero.popup.text}</p>
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