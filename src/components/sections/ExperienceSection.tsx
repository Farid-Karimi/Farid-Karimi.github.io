import { certificates, education, experience } from "@/data/content";
import ArrowIcon from "../ArrowIcon";

export default function ExperienceSection() {
  return (
    <section id="experience" className="home-experience layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>04</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-04">
            <span>Experience</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Engineering, teaching, mentoring</h2>
            </div>
          </div>
          <div className="home-experience__list">
            {experience.map((job) => (
              <div className="experience-item" key={job.title}>
                <div className="experience-item__head">
                  <div className="h3">{job.title}</div>
                  <div className="label">{job.period}</div>
                </div>
                <div className="experience-item__org label mid-grey">{job.org}</div>
                <ul className="experience-item__points">
                  {job.points.map((point) => (
                    <li key={point} className="p">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="home-education layout-grid">
            <div className="home-education__main info">
              <div className="label">Education</div>
              <div className="h3">{education.degree}</div>
              <div className="p">{education.school}</div>
              <div className="label mid-grey">
                {education.period} · GPA {education.gpa}
              </div>
            </div>
            <div className="info">
              <div className="label">Certificates</div>
              {certificates.map((cert) => (
                <a
                  className="certificate-item a-div"
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={cert.title}
                >
                  <span className="certificate-item__body">
                    <span className="p">{cert.title}</span>
                    <span className="label mid-grey">
                      {cert.issuer} · {cert.date}
                    </span>
                  </span>
                  <ArrowIcon variant="external" className="external" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}