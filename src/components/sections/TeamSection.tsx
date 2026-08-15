"use client";

import { useEffect, useRef, useState } from "react";
import { team } from "@/data/team";
import type { TeamMember } from "@/data/team";
import ArrowIcon from "../ArrowIcon";
import BioOverlay from "../BioOverlay";
import CommonInfo from "../CommonInfo";
import TeamMemberCard from "../TeamMemberCard";

const MEMBERS_STEP = 14;

export default function TeamSection() {
  const [active, setActive] = useState<TeamMember | null>(null);
  const [visibleCount, setVisibleCount] = useState(MEMBERS_STEP);
  const membersRef = useRef<HTMLDivElement>(null);

  const allMembers = [...team.highlights, ...team.members];
  const shown = allMembers.slice(0, visibleCount);
  const loaded = visibleCount >= allMembers.length;

  useEffect(() => {
    const root = membersRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll(".common-team-member").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visibleCount]);

  return (
    <section id="team" className="home-team layout-block">
      <CommonInfo
        prefix={team.infoBlock.titlePrefix}
        title={team.infoBlock.titleEn}
        sectionName={team.infoBlock.sectionName ?? undefined}
      />
      <div className="home-team__highlights layout-grid">
        {team.highlights.map((member) => (
          <TeamMemberCard key={member.id} member={member} onSelect={setActive} />
        ))}
      </div>
      <div className="home-team__members layout-grid" ref={membersRef}>
        {shown.map((member) => (
          <TeamMemberCard key={member.id} member={member} onSelect={setActive} />
        ))}
      </div>
      {!loaded ? (
        <div className="home-team__load-more">
          <button className="a-div" onClick={() => setVisibleCount((v) => v + MEMBERS_STEP)}>
            <ArrowIcon variant="horizontal" />
            <span className="label">Show More</span>
          </button>
        </div>
      ) : null}
      {active ? <BioOverlay member={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}