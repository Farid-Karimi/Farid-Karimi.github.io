import ArrowIcon from "./ArrowIcon";

interface CarouselPaginationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselPagination({ onPrev, onNext }: CarouselPaginationProps) {
  return (
    <div className="common-carousel__pagination">
      <button className="cta" onClick={onPrev} aria-label="Previous">
        <span className="icon">
          <ArrowIcon />
        </span>
        <span className="icon">
          <ArrowIcon tone="contrast" />
        </span>
      </button>
      <button className="cta" onClick={onNext} aria-label="Next">
        <span className="icon">
          <ArrowIcon />
        </span>
        <span className="icon">
          <ArrowIcon tone="contrast" />
        </span>
      </button>
    </div>
  );
}