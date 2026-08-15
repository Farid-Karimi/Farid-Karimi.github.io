"use client";

import { usePathname } from "next/navigation";
import { FOOTER_BLURB, FOOTER_COPYRIGHT, FOOTER_SECTIONS, resolveHref } from "@/data/site";
import ArrowIcon from "./ArrowIcon";

export default function PreFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <section className="site-pre-footer">
      <span />
      <div className="site-pre-footer__lines layout-block">
        <div />
        <div />
      </div>
      <div className="site-pre-footer__content">
        {FOOTER_SECTIONS.map((section) => (
          <div className="site-pre-footer__content--item" key={section.label}>
            <div className="table">
              <div className="table--cell title">
                <p className="h3-alt">{section.label}</p>
              </div>
              {section.items.map((item) => (
                <div className="table--cell" key={item.label}>
                  <a
                    className="a-div"
                    href={resolveHref(item.href, item.type, isHome)}
                    {...(item.type === "external"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="h3">{item.label}</span>
                  </a>
                  <ArrowIcon
                    variant={item.type === "external" ? "external" : "diagonal"}
                    className={item.type === "external" ? "external" : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="site-pre-footer__logo">
        <div id="starlogo" />
        <div id="copyright" className="site-pre-footer__copyright">
          <span className="label">{FOOTER_COPYRIGHT}</span>
        </div>
      </div>
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line has-label h2-fluid" data-section={FOOTER_BLURB.label}>
            <span>{FOOTER_BLURB.label}</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info p-large-fluid">{FOOTER_BLURB.blurb}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
