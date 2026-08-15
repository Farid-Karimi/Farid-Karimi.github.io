import { about } from "@/data/about";
import CommonInfo from "../CommonInfo";

export default function AboutSection() {
  const first = about.info?.[0];
  const second = about.info?.[1];

  return (
    <section id="about" className="home-about layout-block">
      <CommonInfo
        prefix={about.titlePrefix}
        title={about.titleEn}
        sectionName={about.sectionName ?? undefined}
      />
      <div className={`common-info__content${about.indent ? " indent" : ""}`}>
        <div className="layout-grid">
          <div className="info p-large-fluid">{first?.description}</div>
        </div>
        <div className="layout-grid">
          <div className="label" data-title={second?.title}>
            {second?.title}
          </div>
          <div aria-label={second?.title ?? undefined} className="info p-large-fluid" data-title={second?.title}>
            {second?.description}
          </div>
        </div>
      </div>
    </section>
  );
}