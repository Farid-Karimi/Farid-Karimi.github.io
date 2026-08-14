export type Theme = "orange" | "pink" | "purple";

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
    label: "Home",
    href: "#home",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Home Section",
  },
  {
    number: "02",
    label: "About",
    href: "#about",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "About Section",
  },
  {
    number: "03",
    label: "Writing",
    href: "#writing",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Writing Section",
  },
  {
    number: "04",
    label: "Team",
    href: "#team",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Team Section",
  },
  {
    number: "05",
    label: "Portfolio",
    href: "#portfolio",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Portfolio Section",
  },
  {
    number: "06",
    label: "Careers",
    href: "#careers",
    type: "anchor",
    noNewTab: true,
    ariaLabel: "Careers Section",
  },
  {
    number: "07",
    label: "Contact",
    href: "/contact",
    type: "internal",
    noNewTab: true,
    ariaLabel: "Contact Page",
  },
];

export const NAV_LEGAL_LINKS: FooterLink[] = [
  {
    label: "Terms",
    href: "/legal/terms",
    type: "internal",
    noNewTab: true,
  },
  {
    label: "Disclosures",
    href: "/legal/disclosures",
    type: "internal",
    noNewTab: true,
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Sections",
    items: [
      { label: "Home", href: "#home", type: "anchor", noNewTab: true },
      { label: "About", href: "#about", type: "anchor", noNewTab: true },
      { label: "Writing", href: "#writing", type: "anchor", noNewTab: true },
      { label: "Team", href: "#team", type: "anchor", noNewTab: true },
      { label: "Portfolio", href: "#portfolio", type: "anchor", noNewTab: true },
      { label: "Careers", href: "#careers", type: "anchor", noNewTab: true },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Contact", href: "/contact", type: "internal", noNewTab: true },
      {
        label: "X",
        href: "https://x.com/dragonfly_xyz",
        type: "external",
        noNewTab: false,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/dragonfly-capital-partners/",
        type: "external",
        noNewTab: false,
      },
      {
        label: "Press Kit",
        href: "https://brand.dragonfly.xyz/",
        type: "external",
        noNewTab: false,
      },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Terms", href: "/legal/terms", type: "internal", noNewTab: true },
      {
        label: "Disclosures",
        href: "/legal/disclosures",
        type: "internal",
        noNewTab: true,
      },
    ],
  },
];

export const FOOTER_BLURB = {
  label: "Info",
  blurb:
    "Dragonfly is a leading crypto investment fund. We back the best researchers and builders who will push the entire crypto ecosystem forward.",
};

export const FOOTER_COPYRIGHT = "Ⓒ Dragonfly Capital 2026";
