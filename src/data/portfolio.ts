import raw from "./homePortfolio.json";
import manifestRaw from "../../public/images/manifest.json";
import type { InfoBlock, LinkItem, Media } from "./site";

const manifest = manifestRaw as unknown as Record<string, string>;

function local(src: string): string {
  return manifest[src.split("?")[0]] ?? src;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  description: string;
  link: LinkItem;
  logo: Media;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  value: string;
}

export interface SpotlightSection {
  infoBlock: InfoBlock;
  items: PortfolioItem[];
}

export interface PortfolioSection {
  infoBlock: InfoBlock;
  categories: PortfolioCategory[];
  spotlight: SpotlightSection;
  index: PortfolioItem[];
}

function toItem(
  p: (typeof raw.portfolioItems)[number]
): PortfolioItem {
  return {
    id: p._id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    categoryLabel: p.categoryLabel,
    description: p.description,
    link: {
      label: p.link?.linkLabel ?? "",
      href: p.link?.linkHref ?? "",
      ariaLabel: p.link?.ariaLabel ?? null,
    },
    logo: { src: local(p.logo.src), alt: p.logo.alt },
  };
}

export const portfolio: PortfolioSection = {
  infoBlock: raw.infoBlock,
  categories: raw.portfolioCategories.map((c) => ({
    id: c._id,
    label: c.label,
    value: c.value,
  })),
  spotlight: {
    infoBlock: raw.spotlight.infoBlock,
    items: raw.spotlight.items.map(toItem),
  },
  index: raw.indexItems.map(toItem),
};
