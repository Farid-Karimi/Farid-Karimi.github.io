import type { PortfolioItem } from "@/data/portfolio";
import PlusIcon from "./PlusIcon";

interface SpotlightRowProps {
  item: PortfolioItem;
  active: boolean;
  onSelect: (item: PortfolioItem) => void;
}

export default function SpotlightRow({ item, active, onSelect }: SpotlightRowProps) {
  return (
    <div className={`common-spotlight--item${active ? " active" : ""}`} onClick={() => onSelect(item)}>
      <p>
        <span className="h2-alt">{item.title}</span>
        <span className="h3" style={{ display: "none" }}>
          {item.categoryLabel}
        </span>
      </p>
      <PlusIcon />
    </div>
  );
}