"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { writing } from "@/data/writing";
import ArrowIcon from "../ArrowIcon";
import CarouselPagination from "../CarouselPagination";
import CommonInfo from "../CommonInfo";
import WritingCard from "../WritingCard";

const PAGE_SIZE = 8;

export default function WritingSection() {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [order, setOrder] = useState(() => writing.featured.map((_, i) => i));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".common-thoughts-list__content--item");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-all");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [filter, visible]);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? writing.allContent
        : writing.allContent.filter((post) => post.category === filter),
    [filter]
  );

  const shown = filtered.slice(0, visible);

  const selectFilter = (value: string) => {
    setFilter(value);
    setVisible(PAGE_SIZE);
  };

  const rotate = (dir: 1 | -1) =>
    setOrder((prev) => prev.map((_, i) => prev[(i + dir + prev.length) % prev.length]));

  return (
    <section id="writing" className="home-writing layout-block">
      <div className="common-carousel">
        <CommonInfo
          prefix={writing.featuredInfoBlock.titlePrefix}
          title={writing.featuredInfoBlock.titleEn}
          sectionName={writing.featuredInfoBlock.sectionName ?? undefined}
        />
        <div className="common-carousel__content">
          {order.map((idx, i) => (
            <WritingCard
              key={writing.featured[idx].id}
              post={writing.featured[idx]}
              variant="featured"
              delay={155 + i * 60}
            />
          ))}
        </div>
        <CarouselPagination onPrev={() => rotate(-1)} onNext={() => rotate(1)} />
      </div>
      <div id="common-thoughts-list" className="common-thoughts-list">
        <CommonInfo
          title={writing.allContentInfoBlock.titleEn}
          sectionName={String(writing.allContent.length)}
        />
        <div className="common-thoughts-list__filters">
          <div className="common-utils-filters" data-lenis-prevent>
            <div className={filter === "all" ? "active" : ""}>
              <div className="label" onClick={() => selectFilter("all")}>
                all
              </div>
            </div>
            {writing.categories.map((category) => (
              <div key={category.id} className={filter === category.value ? "active" : ""}>
                <div className="label" onClick={() => selectFilter(category.value)}>
                  {category.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="common-thoughts-list__content" ref={listRef}>
          {shown.map((post) => (
            <WritingCard key={post.id} post={post} variant="list" />
          ))}
        </div>
        {visible < filtered.length ? (
          <div className="common-index__load-more">
            <button
              className="a-div common-btn-load-more"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              <span className="icon">
                <ArrowIcon variant="horizontal" />
              </span>
              <span className="icon">
                <ArrowIcon variant="horizontal" tone="contrast" />
              </span>
              <span className="label">Load More</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}