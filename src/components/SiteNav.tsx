"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_FOOTER_LINKS, NAV_ITEMS, resolveHref } from "@/data/site";
import ArrowIcon from "./ArrowIcon";
import ThemeSwitcher from "./ThemeSwitcher";

const CLOSED_DOTS = ["4px, 0px", "10px, 0px", "16px, 0px", "22px, 0px", "28px, 0px"];
const OPEN_DOTS = ["10px, -6px", "10px, 6px", "16px, 0px", "22px, -6px", "22px, 6px"];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    const dots = document.querySelectorAll<SVGRectElement>(".nav-dot");
    const targets = open ? OPEN_DOTS : CLOSED_DOTS;
    dots.forEach((dot, i) => {
      dot.animate(
        [{ transform: `translate(${targets[i]})` }],
        {
          duration: 400,
          delay: i * 15,
          easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          fill: "forwards",
        }
      );
    });
  }, [open]);

  return (
    <nav className={`site-nav${open ? " open" : ""}`}>
      <div className={`site-nav__main${open ? " active" : ""}`} onClick={toggle} role="button" aria-expanded={open}>
        <div>
          <span className="site-nav__logo">FK</span>
        </div>
        <div>
          <span className="ui-icon nav-toggle">
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect className="nav-dot" x="0" y="6" width="4" height="4" fill="var(--theme-contrast)" />
              <rect className="nav-dot" x="0" y="6" width="4" height="4" fill="var(--theme-contrast)" />
              <rect className="nav-dot" x="0" y="6" width="4" height="4" fill="var(--theme-contrast)" />
              <rect className="nav-dot" x="0" y="6" width="4" height="4" fill="var(--theme-contrast)" />
              <rect className="nav-dot" x="0" y="6" width="4" height="4" fill="var(--theme-contrast)" />
            </svg>
          </span>
        </div>
        <div>
          <span className="label">Menu</span>
        </div>
      </div>
      <div className={`site-nav__menu${open ? " active" : ""}`}>
        <ul role="menu">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={`${item.number}-${item.label}`}
              className="navigation-item"
              role="menuitem"
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              <a
                className="a-div"
                href={resolveHref(item.href, item.type, isHome)}
                data-index={item.number}
                onClick={close}
                aria-label={item.ariaLabel ?? undefined}
              >
                <span className="h3">{item.label}</span>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
        <div className="site-nav__footer navigation-item" style={{ transitionDelay: open ? "360ms" : "0ms" }}>
          <div className="site-nav__footer--links">
            {NAV_FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                className="a-div"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                <span className="label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}