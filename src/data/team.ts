import raw from "./homeTeam.json";
import type { InfoBlock, LinkItem, Media } from "./site";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote: string | null;
  media: Media;
  social: LinkItem[];
}

export interface TeamSection {
  highlights: TeamMember[];
  members: TeamMember[];
  infoBlock: InfoBlock;
}

interface RawTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  quote: string | null;
  media: { src: string; alt: string | null; type: string };
  social:
    | Array<{ linkLabel: string; linkHref: string; ariaLabel: string | null }>
    | null;
  links:
    | Array<{ linkLabel: string; linkHref: string; ariaLabel: string | null }>
    | null;
}

function toLink(
  l: { linkLabel: string; linkHref: string; ariaLabel: string | null },
): LinkItem {
  return { label: l.linkLabel, href: l.linkHref, ariaLabel: l.ariaLabel };
}

function toMember(m: RawTeamMember): TeamMember {
  const seen = new Set<string>();
  const social = [...(m.social ?? []), ...(m.links ?? [])].filter((l) => {
    if (seen.has(l.linkHref)) return false;
    seen.add(l.linkHref);
    return true;
  });
  return {
    id: m._id,
    name: m.name,
    role: m.role,
    bio: m.bio,
    quote: m.quote,
    media: { src: m.media.src, alt: m.media.alt, type: m.media.type },
    social: social.map(toLink),
  };
}

export const team: TeamSection = {
  highlights: raw.highlights.map(toMember),
  members: raw.members.map(toMember),
  infoBlock: raw.infoBlock,
};
