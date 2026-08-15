"use client";

import { useState } from "react";
import { blog } from "@/data/content";
import type { BlogPost } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import BlogModal from "../BlogModal";

const ALL = "all";
const tags = [ALL, ...Array.from(new Set(blog.flatMap((post) => post.tags)))];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export default function BlogSection() {
  const [activeTag, setActiveTag] = useState(ALL);
  const [active, setActive] = useState<BlogPost | null>(null);

  const posts = activeTag === ALL ? blog : blog.filter((post) => post.tags.includes(activeTag));

  return (
    <section id="blog" className="home-blog layout-block">
      <div className="common-info">
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>04 — Blog</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Notes &amp; post-mortems</h2>
            </div>
          </div>
          <div className="common-thoughts-list__filters">
            <div className="common-utils-filters" role="tablist" aria-label="Blog tag filters">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className={tag === activeTag ? "active" : ""}
                  onClick={() => setActiveTag(tag)}
                  role="tab"
                  aria-selected={tag === activeTag}
                >
                  <span className="label">{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="common-thoughts-list__content">
            {posts.map((post, i) => (
              <button key={post.slug} className="blog-item a-div" onClick={() => setActive(post)}>
                <div className="blog-item__row">
                  <div className="h3">{post.title}</div>
                  <div className="label">{formatDate(post.date)}</div>
                </div>
                <div className="blog-item__row">
                  <p className="p description-text">{post.excerpt}</p>
                  <span className="blog-item__arrow">
                    <ArrowIcon />
                  </span>
                </div>
                <div className="blog-item__tags">
                  {post.tags.map((tag) => (
                    <span className="label" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {active ? <BlogModal post={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}