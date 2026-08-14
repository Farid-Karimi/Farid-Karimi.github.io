import raw from "./homeWriting.json";
import type { InfoBlock, LinkItem, Media } from "./site";

export interface WritingPost {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: Media;
  watchLink: LinkItem;
}

export interface WritingCategory {
  id: string;
  label: string;
  value: string;
}

export interface WritingSection {
  featuredInfoBlock: InfoBlock;
  allContentInfoBlock: InfoBlock;
  featured: WritingPost[];
  categories: WritingCategory[];
  allContent: WritingPost[];
}

interface RawWritingPost {
  _id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: { src: string; alt: string | null };
  watchLink: {
    ariaLabel: string | null;
    linkHref: string;
    linkLabel: string;
  };
}

function toPost(p: RawWritingPost): WritingPost {
  return {
    id: p._id,
    title: p.title,
    category: p.category,
    categoryLabel: p.categoryLabel,
    description: p.description,
    image: { src: p.image.src, alt: p.image.alt },
    watchLink: {
      label: p.watchLink?.linkLabel ?? "",
      href: p.watchLink?.linkHref ?? "",
      ariaLabel: p.watchLink?.ariaLabel ?? null,
    },
  };
}

export const writing: WritingSection = {
  featuredInfoBlock: raw.featuredInfoBlock,
  allContentInfoBlock: raw.allContentInfoBlock,
  featured: raw.featuredItems.map(toPost),
  categories: raw.writingCategories.map((c) => ({
    id: c._id,
    label: c.label,
    value: c.value,
  })),
  allContent: raw.writingContentAll.map(toPost),
};
