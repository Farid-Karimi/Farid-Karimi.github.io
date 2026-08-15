import type { TeamMember } from "@/data/team";
import PlusIcon from "./PlusIcon";

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

export default function TeamMemberCard({ member, onSelect }: TeamMemberCardProps) {
  return (
    <div className="a-team-member" style={{ width: "100%" }}>
      <div className="common-team-member" onClick={() => onSelect(member)}>
        <div className="common-team-member__media media">
          <div className="common-media cover">
            <img src={member.media.src} alt={member.media.alt ?? member.name} loading="lazy" />
          </div>
        </div>
        <div className="common-team-member__content">
          <div className="common-team-member__content--cta cta">
            <PlusIcon />
            <span className="label">Show Bio</span>
          </div>
          <div className="common-team-member__content--info">
            <p className="h3">{member.name}</p>
            <p className="h3-alt grey-300">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}