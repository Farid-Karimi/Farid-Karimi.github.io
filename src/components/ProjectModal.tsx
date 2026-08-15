"use client";

import { useEffect } from "react";
import type { Project } from "@/data/content";
import PlusIcon from "./PlusIcon";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const sections: Array<{ label: string; text: string }> = [
    { label: "summary", text: project.sections.summary },
    { label: "challenge", text: project.sections.challenge },
    { label: "architecture", text: project.sections.architecture },
    { label: "results", text: project.sections.results },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content project" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content__body">
          <div id="wrapper--header">
            <div className="common-ui-header" onClick={onClose}>
              <div className="label">
                <div>detail</div>
              </div>
              <div>
                <PlusIcon />
              </div>
              <div className="label">
                <div>close</div>
              </div>
            </div>
          </div>
          <div id="wrapper">
            <div className="scroller scroller--info">
              <div className="common-modal-title animate highlighted">
                <div className="h3">
                  <div>{project.title}</div>
                </div>
              </div>
              <div className="common-modal-title animate">
                <div className="h3-alt">
                  <div>
                    {project.role} · {project.year}
                  </div>
                </div>
              </div>
              <div className="common-modal-description animate">
                <div className="label mid-grey">stack</div>
                <div className="p description-text">{project.stack.join(" · ")}</div>
              </div>
              <div className="common-modal-metrics animate">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="common-modal-metrics__item">
                    <div className="display">{metric.value}</div>
                    <div className="label mid-grey">{metric.label}</div>
                  </div>
                ))}
              </div>
              {sections.map((section) => (
                <div className="common-modal-description animate" key={section.label}>
                  <div className="label mid-grey">{section.label}</div>
                  <div className="p description-text">{section.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}