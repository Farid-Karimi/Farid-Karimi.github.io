"use client";

import { useState } from "react";
import { projects } from "@/data/content";
import type { Project } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import ProjectModal from "../ProjectModal";
import { useReveal } from "@/hooks/useReveal";

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const gridRef = useReveal<HTMLDivElement>(".project-card");
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

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
          <div className="home-projects__grid layout-grid" ref={gridRef}>
            {featured.map((project, i) => (
              <button
                key={project.slug}
                className="project-card"
                onClick={() => setActive(project)}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="project-card__media">
                  <span className="gradient-shader project-card__shader" />
                  <span className="grain-layer" />
                  <span className="project-card__number display">0{i + 1}</span>
                </span>
                <span className="project-card__meta">
                  <span className="label">{project.role}</span>
                  <span className="label">{project.year}</span>
                </span>
                <span className="project-card__title h3">{project.title}</span>
                <span className="project-card__summary p">{project.summary}</span>
                <span className="project-card__arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>
          <div className="home-projects__list">
            {rest.map((project) => (
              <button key={project.slug} className="project-row" onClick={() => setActive(project)}>
                <span className="project-row__title h3">{project.title}</span>
                <span className="project-row__stack label">
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
                <span className="project-row__arrow">
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