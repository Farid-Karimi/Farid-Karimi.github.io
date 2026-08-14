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
}

function toMember(m: RawTeamMember): TeamMember {
  return {
    id: m._id,
    name: m.name,
    role: m.role,
    bio: m.bio,
    quote: m.quote,
    media: { src: m.media.src, alt: m.media.alt, type: m.media.type },
    social: (m.social ?? []).map((s) => ({
      label: s.linkLabel,
      href: s.linkHref,
      ariaLabel: s.ariaLabel,
    })),
  };
}

export const team: TeamSection = {
  highlights: raw.highlights.map(toMember),
  members: raw.members.map(toMember),
  infoBlock: raw.infoBlock,
};
