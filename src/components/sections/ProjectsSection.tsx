"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { projects } from "@/data/content";
import type { Project } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import ProjectModal from "../ProjectModal";
import { useReveal } from "@/hooks/useReveal";

function cardStep(track: HTMLDivElement): number {
  const card = track.querySelector<HTMLElement>(".project-card");
  if (!card) return 0;
  return card.offsetWidth + 4;
}

function stopCountOf(track: HTMLDivElement): number {
  const s = cardStep(track);
  if (s <= 0) return 1;
  const maxScroll = track.scrollWidth - track.clientWidth;
  return Math.max(1, Math.min(projects.length, Math.round(maxScroll / s) + 1));
}

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stopCount, setStopCount] = useState(1);
  const revealRef = useReveal<HTMLDivElement>(".project-card");
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setStopCount(stopCountOf(track));
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const combinedRef = (el: HTMLDivElement | null) => {
    trackRef.current = el;
    revealRef.current = el;
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const s = cardStep(track);
    if (s <= 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const idx = track.scrollLeft >= maxScroll - 2 ? stopCount - 1 : Math.round(track.scrollLeft / s);
    setActiveIndex(Math.min(stopCount - 1, Math.max(0, idx)));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { startX: e.clientX, startLeft: track.scrollLeft, moved: false };
    if (e.target instanceof Element) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 6) drag.moved = true;
    track.scrollLeft = drag.startLeft - dx;
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    if (drag) {
      window.setTimeout(() => {
        if (dragRef.current === drag) dragRef.current = null;
      }, 0);
    }
  };

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const s = cardStep(track);
    if (s <= 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = track.scrollLeft + dir * s;
    const clamped = Math.max(0, Math.min(next, maxScroll));
    if (clamped !== track.scrollLeft) {
      track.scrollTo({ left: clamped, behavior: "smooth" });
    }
  };

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const s = cardStep(track);
    if (s <= 0) return;
    track.scrollTo({ left: i * s, behavior: "smooth" });
  };

  const onCardClick = (e: React.MouseEvent, project: Project) => {
    if (dragRef.current?.moved) {
      e.preventDefault();
      return;
    }
    setActive(project);
  };

  return (
    <section id="projects" className="home-projects layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>02</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-02">
            <span>Projects</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Selected work</h2>
            </div>
          </div>
          <div className="home-projects__carousel">
            <div
              className="home-projects__grid"
              ref={combinedRef}
              onScroll={onScroll}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {projects.map((project, i) => (
                <button
                  key={project.slug}
                  className="project-card"
                  onClick={(e) => onCardClick(e, project)}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="project-card__media">
                    <span className="project-card__number display">0{i + 1}</span>
                  </span>
                  <span className="project-card__meta">
                    <span className="label">{project.role}</span>
                    <span className="label">{project.year}</span>
                  </span>
                  <span className="project-card__title h3">{project.title}</span>
                  <span className="project-card__summary p">{project.summary}</span>
                  <span className="project-card__stack label">
                    {project.stack.slice(0, 3).join(" · ")}
                  </span>
                  <span className="project-card__arrow">
                    <ArrowIcon />
                  </span>
                </button>
              ))}
            </div>
            <div className="home-projects__pagination">
              <button
                className="home-projects__pag-cta"
                onClick={() => step(-1)}
                aria-label="Previous projects"
              >
                <ArrowIcon flip tone="current" />
              </button>
              <div className="home-projects__pag-dots">
                {Array.from({ length: stopCount }, (_, i) => (
                  <button
                    key={i}
                    className={`home-projects__pag-dot${i === activeIndex ? " active" : ""}`}
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className="home-projects__pag-cta"
                onClick={() => step(1)}
                aria-label="Next projects"
              >
                <ArrowIcon tone="current" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {active ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}