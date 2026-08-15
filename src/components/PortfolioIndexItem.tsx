import type { PortfolioItem } from "@/data/portfolio";
import PlusIcon from "./PlusIcon";

interface PortfolioIndexItemProps {
  item: PortfolioItem;
  open: boolean;
  onSelect: (item: PortfolioItem) => void;
}

export default function PortfolioIndexItem({ item, open, onSelect }: PortfolioIndexItemProps) {
  return (
    <div className={`title${open ? " open" : ""}`} onClick={() => onSelect(item)}>
      <div className="h3">{item.title}</div>
      <div>
        <PlusIcon />
      </div>
    </div>
  );
}