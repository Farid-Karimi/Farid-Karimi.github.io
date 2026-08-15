"use client";

import { services } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import { useReveal } from "@/hooks/useReveal";

export default function ServicesSection() {
  const listRef = useReveal<HTMLDivElement>(".home-services__row");

  return (
    <section id="services" className="home-services layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>03</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-03">
            <span>Services</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">What I do.</h2>
            </div>
          </div>
          <div className="home-services__list" ref={listRef}>
            {services.map((service, i) => (
              <div
                className="home-services__row"
                style={{ transitionDelay: `${i * 100}ms` }}
                key={service.title}
              >
                <div className="label home-services__number">0{i + 1}</div>
                <div className="home-services__body">
                  <div className="h3">{service.title}</div>
                  <p className="p description-text">{service.description}</p>
                </div>
                <span className="home-services__arrow">
                  <ArrowIcon />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}