"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { projects } from "@/data/content";
import type { Project } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import ProjectModal from "../ProjectModal";
import { useReveal } from "@/hooks/useReveal";

const CLONES = 3;

function cardStep(track: HTMLDivElement): number {
  const card = track.querySelector<HTMLElement>(".project-card");
  if (!card) return 0;
  return card.offsetWidth + 4;
}

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const revealRef = useReveal<HTMLDivElement>(".project-card");
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  const combinedRef = (el: HTMLDivElement | null) => {
    trackRef.current = el;
    revealRef.current = el;
  };

  const all = [...projects, ...projects.slice(0, CLONES)];
  const realCount = projects.length;

  const wrap = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep(track);
    if (step <= 0) return;
    const left = track.scrollLeft;
    if (left >= step * realCount - 1) {
      track.scrollLeft = left - step * realCount;
    }
  };

  const onScroll = () => wrap();

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
    if (dir === -1 && track.scrollLeft <= 1) {
      track.scrollTo({ left: s * (realCount - 1), behavior: "smooth" });
      return;
    }
    track.scrollTo({ left: track.scrollLeft + dir * s, behavior: "smooth" });
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
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>02 — Projects</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Selected work</h2>
            </div>
          </div>
          <div className="home-projects__nav">
            <button className="home-projects__nav-btn" onClick={() => step(-1)} aria-label="Previous projects">
              <ArrowIcon />
            </button>
            <button className="home-projects__nav-btn" onClick={() => step(1)} aria-label="Next projects">
              <ArrowIcon />
            </button>
          </div>
          <div
            className="home-projects__grid"
            ref={combinedRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {all.map((project, i) => (
              <button
                key={`${project.slug}-${i}`}
                className="project-card"
                onClick={(e) => onCardClick(e, project)}
                style={{ transitionDelay: `${(i % realCount) * 120}ms` }}
              >
                <span className="project-card__media">
                  <span className="project-card__number display">0{(i % realCount) + 1}</span>
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
        </div>
      </div>
      {active ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}