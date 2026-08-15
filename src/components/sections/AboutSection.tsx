import { about } from "@/data/content";
import StatsSection from "./StatsSection";

export default function AboutSection() {
  return (
    <section id="about" className="home-about layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>01</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-01">
            <span>About</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">{about.hook}</h2>
            </div>
          </div>
          <div className="layout-grid">
            {about.paragraphs.map((paragraph, i) => (
              <div className="info" key={i}>
                <div className="label">{i === 0 ? "Bio" : "Teaching"}</div>
                <p className="p description-text">{paragraph}</p>
              </div>
            ))}
          </div>
          <StatsSection />
        </div>
      </div>
    </section>
  );
}