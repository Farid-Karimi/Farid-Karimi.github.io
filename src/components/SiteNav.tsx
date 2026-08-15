"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_FOOTER_LINKS, NAV_ITEMS } from "@/data/site";
import ArrowIcon from "./ArrowIcon";
import ThemeSwitcher from "./ThemeSwitcher";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const hrefFor = (item: (typeof NAV_ITEMS)[number]) =>
    item.type === "anchor" && !isHome ? `/${item.href}` : item.href;

  return (
    <nav className={`site-nav${open ? " open" : ""}`}>
      <div className={`site-nav__main${open ? " active" : ""}`} onClick={toggle} role="button" aria-expanded={open}>
        <div>
          <span className="site-nav__logo">FK</span>
        </div>
        <div>
          <span className="ui-icon ham">
            <svg width="28" height="4" viewBox="0 0 28 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" width="4" height="4" transform="rotate(90 4 0)" fill="var(--theme-contrast)" />
              <rect x="10" width="4" height="4" transform="rotate(90 10 0)" fill="var(--theme-contrast)" />
              <rect x="16" width="4" height="4" transform="rotate(90 16 0)" fill="var(--theme-contrast)" />
              <rect x="22" width="4" height="4" transform="rotate(90 22 0)" fill="var(--theme-contrast)" />
              <rect x="28" width="4" height="4" transform="rotate(90 28 0)" fill="var(--theme-contrast)" />
            </svg>
          </span>
          <span className="ui-icon close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" width="4" height="4" transform="rotate(90 4 0)" fill="var(--theme-contrast)" />
              <rect x="16" width="4" height="4" transform="rotate(90 16 0)" fill="var(--theme-contrast)" />
              <rect x="16" y="12" width="4" height="4" transform="rotate(90 16 12)" fill="var(--theme-contrast)" />
              <rect x="6" y="10" width="4" height="4" transform="rotate(-90 6 10)" fill="var(--theme-contrast)" />
              <rect x="4" y="12" width="4" height="4" transform="rotate(90 4 12)" fill="var(--theme-contrast)" />
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
                href={hrefFor(item)}
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
        <div className="navigation-item site-nav__themes-wrap" style={{ transitionDelay: open ? "430ms" : "0ms" }}>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}