import raw from "./homeCareers.json";
import type { InfoBlock, LinkItem } from "./site";

export interface CareerCard {
  id: string;
  eyebrow: string;
  text: string[];
  link: LinkItem;
}

export interface CareersSection {
  infoBlock: InfoBlock;
  careerLinks: CareerCard[];
}

export const careers: CareersSection = {
  infoBlock: raw.infoBlock,
  careerLinks: raw.careerLinks.map((c) => ({
    id: c._id,
    eyebrow: c.eyebrow,
    text: c.text,
    link: {
      label: c.link?.linkLabel ?? "",
      href: c.link?.linkHref ?? "",
      ariaLabel: c.link?.ariaLabel ?? null,
    },
  })),
};
