"use client";

import { useEffect, useRef } from "react";
import type { TeamMember } from "@/data/team";
import PlusIcon from "./PlusIcon";

interface BioOverlayProps {
  member: TeamMember;
  onClose: () => void;
}

export default function BioOverlay({ member, onClose }: BioOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let t = 0;
    const w = (canvas.width = canvas.clientWidth * 2);
    const h = (canvas.height = canvas.clientHeight * 2);
    ctx.scale(2, 2);

    const draw = () => {
      t += 0.02;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);
      ctx.strokeStyle = "rgba(242,242,242,0.5)";
      ctx.lineWidth = 1;
      ctx.save();
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate(Math.sin(t * 0.6) * 0.04);
      const flap = Math.sin(t * 6);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.quadraticCurveTo(-50, -60 + flap * 10, -10, -78 + flap * 10);
      ctx.moveTo(0, -20);
      ctx.quadraticCurveTo(50, -60 + flap * 10, 10, -78 + flap * 10);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-46, 26 - flap * 8, -8, 44 - flap * 8);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(46, 26 - flap * 8, 8, 44 - flap * 8);
      ctx.moveTo(0, 24);
      ctx.lineTo(0, -28);
      ctx.arc(0, -28, 5, Math.PI, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(-14, 40);
      ctx.moveTo(0, 0);
      ctx.lineTo(14, 40);
      ctx.stroke();
      ctx.restore();
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="modal-content portfolio" role="dialog" aria-modal="true">
      <div className="modal-content__body">
        <div id="wrapper--header">
          <div className="common-ui-header" onClick={onClose}>
            <div className="label">
              <div>detail</div>
            </div>
            <div>
              <PlusIcon />
            </div>
            <div className="label">
              <div>close</div>
            </div>
          </div>
        </div>
        <div id="wrapper">
          <div className="scroller scroller--media">
            <div className="common-modal-media animate">
              <div className="common-media cover">
                <img src={member.media.src} alt={member.media.alt ?? member.name} loading="lazy" />
              </div>
              <div className="common-modal-media__overlay">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.99512 0V8" stroke="#585858" />
                  <path d="M8 3.99512L-5.96046e-08 3.99512" stroke="#585858" />
                </svg>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.99512 0V8" stroke="#585858" />
                  <path d="M8 3.99512L-5.96046e-08 3.99512" stroke="#585858" />
                </svg>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.99512 0V8" stroke="#585858" />
                  <path d="M8 3.99512L-5.96046e-08 3.99512" stroke="#585858" />
                </svg>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.99512 0V8" stroke="#585858" />
                  <path d="M8 3.99512L-5.96046e-08 3.99512" stroke="#585858" />
                </svg>
              </div>
            </div>
          </div>
          <div className="scroller scroller--info">
            <div data-label="Name" className="common-modal-title animate highlighted">
              <div className="h3">
                <div>{member.name}</div>
              </div>
            </div>
            <div data-label="Role" className="common-modal-title animate">
              <div className="h3-alt">
                <div>{member.role}</div>
              </div>
            </div>
            <div className="common-modal-description animate">
              <div className="label mid-grey">bio</div>
              <div className="p description-text">{member.bio}</div>
            </div>
          </div>
          {member.social.length > 0 ? (
            <div className="scroller scroller--external">
              <div className="common-modal-social animate">
                {member.social.map((link) => (
                  <div key={link.href}>
                    <a
                      className="a-div has-link h3"
                      href={link.href}
                      aria-label={link.ariaLabel ?? link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="scroller canvas animate">
            <canvas id="modal" ref={canvasRef} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}