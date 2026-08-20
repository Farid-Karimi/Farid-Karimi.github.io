import { site } from "./content";

export type Theme = "grotesk" | "starboy" | "dawnfm" | "mdm" | "afterhours";

export interface Media {
  src: string;
  alt: string | null;
  type?: string;
}

export interface LinkItem {
  label: string;
  href: string;
  ariaLabel: string | null;
}

export interface Info {
  title: string | null;
  description: string;
}

export interface InfoBlock {
  indent: boolean;
  info: Info[] | null;
  sectionName: string | null;
  titleEn: string;
  titlePrefix: string | null;
}

export interface NavItem {
  number: string;
  label: string;
  href: string;
  type: "anchor" | "internal";
  noNewTab: boolean;
  ariaLabel: string | null;
}

export interface FooterLink {
  label: string;
  href: string;
  type: "anchor" | "internal" | "external";
  noNewTab: boolean;
}

export interface FooterSection {
  label: string;
  items: FooterLink[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    number: "01",
    label: "About",
    href: "#about",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "About Section",
  },
  {
    number: "02",
    label: "Projects",
    href: "#projects",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Projects Section",
  },
  {
    number: "03",
    label: "Services",
    href: "#services",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Services Section",
  },
  {
    number: "04",
    label: "Experience",
    href: "#experience",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Experience Section",
  },
  {
    number: "05",
    label: "Blog",
    href: "/blog",
    type: "internal",
    noNewTab: true,
    ariaLabel: "Blog Page",
  },
  {
    number: "06",
    label: "Contact",
    href: "#contact",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Contact Section",
  },
];

export const NAV_FOOTER_LINKS: FooterLink[] = [
  {
    label: "GitHub",
    href: site.github,
    type: "external",
    noNewTab: false,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    type: "external",
    noNewTab: false,
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    type: "external",
    noNewTab: false,
  },
  {
    label: "Unsplash",
    href: "https://unsplash.com/@farid_karimi",
    type: "external",
    noNewTab: false,
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Sections",
    items: NAV_ITEMS.map((item) => ({
      label: item.label,
      href: item.href,
      type: item.type,
      noNewTab: item.noNewTab,
    })),
  },
  {
    label: "Connect",
    items: [
      { label: "GitHub", href: site.github, type: "external", noNewTab: false },
      { label: "LinkedIn", href: site.linkedin, type: "external", noNewTab: false },
      { label: "Email", href: `mailto:${site.email}`, type: "external", noNewTab: false },
      { label: "Unsplash", href: "https://unsplash.com/@farid_karimi", type: "external", noNewTab: false },
    ],
  },
  {
    label: "Elsewhere",
    items: [
      { label: "Blog", href: "/blog", type: "internal", noNewTab: true },
      { label: "GitHub Pages", href: site.githubPages, type: "external", noNewTab: false },
    ],
  },
];

export const FOOTER_COPYRIGHT = `Ⓒ ${site.name} 2026`;

export const FOOTER_BLURB = {
  blurb:
    "AI/ML Engineer building intelligent systems that turn research into practical tools.",
};

export const SITE = site;

export function resolveHref(
  href: string,
  type: "anchor" | "internal" | "external",
  isHome: boolean
): string {
  return type === "anchor" && !isHome ? `/${href}` : href;
}