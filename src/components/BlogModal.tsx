"use client";

import { useEffect } from "react";
import type { BlogPost } from "@/data/content";
import PlusIcon from "./PlusIcon";

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content project" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
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
            <div className="scroller scroller--info">
              <div className="common-modal-title animate highlighted">
                <div className="h3">
                  <div>{post.title}</div>
                </div>
              </div>
              <div className="common-modal-title animate">
                <div className="h3-alt">
                  <div>{formatDate(post.date)}</div>
                </div>
              </div>
              <div className="common-modal-description animate">
                <div className="label mid-grey">tags</div>
                <div className="p description-text">{post.tags.map((t) => `#${t}`).join(" ")}</div>
              </div>
              <div className="common-modal-description animate">
                <div className="label mid-grey">post</div>
                <div className="p description-text">{post.body}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}