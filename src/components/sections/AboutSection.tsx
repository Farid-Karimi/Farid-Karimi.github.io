import { about } from "@/data/content";
import StatsSection from "./StatsSection";

export default function AboutSection() {
  return (
    <section id="about" className="home-about layout-block">
      <div className="common-info">
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>01 — About</span>
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