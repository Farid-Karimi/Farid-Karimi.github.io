"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolio";
import ArrowIcon from "../ArrowIcon";
import CommonInfo from "../CommonInfo";
import PortfolioIndexItem from "../PortfolioIndexItem";
import PortfolioModal from "../PortfolioModal";
import SpotlightRow from "../SpotlightRow";

const PAGE_SIZE = 12;

function groupByLetter(items: PortfolioItem[]): Array<{ letter: string; items: PortfolioItem[] }> {
  const groups: Array<{ letter: string; items: PortfolioItem[] }> = [];
  for (const item of items) {
    const letter = item.title.charAt(0).toUpperCase();
    const last = groups[groups.length - 1];
    if (last && last.letter === letter) {
      last.items.push(item);
    } else {
      groups.push({ letter, items: [item] });
    }
  }
  return groups;
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? portfolio.index
        : portfolio.index.filter((item) => item.category === filter),
    [filter]
  );

  const shown = filtered.slice(0, visible);

  const columns = useMemo(() => {
    const colCount = 4;
    const chunk = Math.ceil(shown.length / colCount);
    const cols: PortfolioItem[][] = [];
    for (let i = 0; i < colCount; i++) {
      cols.push(shown.slice(i * chunk, (i + 1) * chunk));
    }
    return cols;
  }, [shown]);

  const selectFilter = (value: string) => {
    setFilter(value);
    setVisible(PAGE_SIZE);
  };

  const select = (item: PortfolioItem) => {
    setActive(item);
    setOpenId(item.id);
  };

  return (
    <section id="portfolio" className="home-portfolio layout-block">
      <span />
      <CommonInfo
        prefix={portfolio.infoBlock.titlePrefix}
        title={portfolio.infoBlock.titleEn}
        sectionName={portfolio.infoBlock.sectionName ?? undefined}
      />
      <div className="common-info__content">
        {portfolio.infoBlock.info?.map((info, i) =>
          info.title ? (
            <div className="layout-grid" key={i}>
              <div className="label" data-title={info.title}>
                {info.title}
              </div>
              <div aria-label={info.title} className="info p-large-fluid" data-title={info.title}>
                {info.description}
              </div>
            </div>
          ) : (
            <div className="layout-grid" key={i}>
              <div className="info p-large-fluid">{info.description}</div>
            </div>
          )
        )}
      </div>
      <div className="home-portfolio__spotlight">
        <CommonInfo
          title={portfolio.spotlight.infoBlock.titleEn}
          sectionName={portfolio.spotlight.infoBlock.sectionName ?? undefined}
        />
        <div className="common-spotlight">
          {portfolio.spotlight.items.map((item) => (
            <SpotlightRow
              key={item.id}
              item={item}
              active={openId === item.id}
              onSelect={select}
            />
          ))}
        </div>
      </div>
      <div className="home-portfolio__index">
        <div id="common-index" className="common-index">
          <CommonInfo title="Index" sectionName={String(portfolio.index.length)} />
          <div className="common-index__filters">
            <div className="common-utils-filters" data-lenis-prevent>
              <div className={filter === "all" ? "active" : ""}>
                <div className="label" onClick={() => selectFilter("all")}>
                  all
                </div>
              </div>
              {portfolio.categories.map((category) => (
                <div key={category.id} className={filter === category.value ? "active" : ""}>
                  <div className="label" onClick={() => selectFilter(category.value)}>
                    {category.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="common-index__list">
            {columns.map((col, colIdx) => (
              <div className="common-index__list--col" key={colIdx}>
                {groupByLetter(col).map((group) => (
                  <div className="common-index__list--item" data-letter={group.letter} key={group.letter}>
                    <div className="h3-alt letter">{group.letter}</div>
                    {group.items.map((item) => (
                      <PortfolioIndexItem
                        key={item.id}
                        item={item}
                        open={openId === item.id}
                        onSelect={select}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="common-index__load-more">
              <button className="a-div common-btn-load-more" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
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
      </div>
      {active ? <PortfolioModal item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}