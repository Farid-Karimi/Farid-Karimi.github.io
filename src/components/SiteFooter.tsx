"use client";

import { useEffect, useState } from "react";
import { FOOTER_COPYRIGHT } from "@/data/site";
import CrosshairIcon from "./CrosshairIcon";

export default function SiteFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      setVisible(nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer__overlay">
        <div className="layout-grid">
          <div className="site-footer__overlay--item">
            <CrosshairIcon />
          </div>
          <div className="site-footer__overlay--item">
            <CrosshairIcon />
          </div>
        </div>
      </div>
      <div id="copyright" className={visible ? "visible" : ""}>
        <span className="label">{FOOTER_COPYRIGHT}</span>
      </div>
    </footer>
  );
}
