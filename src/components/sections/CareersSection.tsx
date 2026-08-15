"use client";

import { useEffect, useRef } from "react";
import { careers } from "@/data/careers";
import type { CareerCard } from "@/data/careers";
import ArrowIcon from "./ArrowIcon";
import CommonInfo from "./CommonInfo";

function Glyph({ id }: { id: string }) {
  if (id === "blossom") {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="4" stroke="var(--off-white)" strokeWidth="1.5" />
        <circle cx="50" cy="24" r="14" stroke="var(--off-white)" strokeWidth="1.5" />
        <circle cx="76" cy="50" r="14" stroke="var(--off-white)" strokeWidth="1.5" />
        <circle cx="50" cy="76" r="14" stroke="var(--off-white)" strokeWidth="1.5" />
        <circle cx="24" cy="50" r="14" stroke="var(--off-white)" strokeWidth="1.5" />
        <path d="M50 88V96M50 4V12M88 50H96M4 50H12" stroke="var(--off-white)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (id === "tree") {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M50 96V52M50 52L30 30M50 52L70 30M50 60L36 42M50 60L64 42M50 68L42 54M50 68L58 54" stroke="var(--off-white)" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 46C40 30 60 30 78 46M22 54C40 70 60 70 78 54M50 30V70M50 70L38 86M50 70L62 86M50 26C50 22 47 19 43 19C39 19 36 22 36 26" stroke="var(--off-white)" strokeWidth="1.5" />
    </svg>
  );
}

export default function CareersSection() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".career-item").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="careers" className="home-careers layout-block">
      <span />
      <CommonInfo
        prefix={careers.infoBlock.titlePrefix}
        title={careers.infoBlock.titleEn}
        sectionName={careers.infoBlock.sectionName ?? undefined}
      />
      <div className="common-info__content centered">
        <div className="layout-grid">
          <div className="info p-large-fluid">{careers.infoBlock.info?.[0]?.description}</div>
        </div>
      </div>
      <div className="home-careers__list layout-grid" ref={listRef}>
        {careers.careerLinks.map((card: CareerCard) => (
          <a
            className="a-div has-link career-item"
            href={card.link.href}
            aria-label={card.link.ariaLabel ?? card.link.label}
            target="_blank"
            rel="noopener noreferrer"
            key={card.id}
          >
            <div className="label mid-grey">{card.eyebrow}</div>
            <div className="content">
              <div id={card.id} className="content--gl">
                <Glyph id={card.id} />
              </div>
              <div className="content--title">
                <div>
                  <span className="h3">{card.text[0]}</span>
                </div>
                <div>
                  <span className="h3-alt">{card.text[1]}</span>
                </div>
              </div>
            </div>
            <div className="a-div h3">
              <span>{card.link.label}</span>
              <div className="ui-icon">
                <ArrowIcon />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}