import type { WritingPost } from "@/data/writing";
import ArrowIcon from "./ArrowIcon";

interface WritingCardProps {
  post: WritingPost;
  variant: "featured" | "list";
  delay?: number;
}

export default function WritingCard({ post, variant, delay }: WritingCardProps) {
  const href = post.watchLink.href;
  const ariaLabel = post.watchLink.ariaLabel ?? post.watchLink.label;

  if (variant === "list") {
    return (
      <a
        className="a-div has-link common-thoughts-list__content--item layout-grid"
        href={href}
        aria-label={ariaLabel ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="h4">{post.title}</div>
        <div className="p">
          <span className="clamp">{post.description}</span>
        </div>
        <div className="label">{post.categoryLabel}</div>
        <div>
          <ArrowIcon variant="external" tone="contrast" />
        </div>
      </a>
    );
  }

  return (
    <a
      className="a-div has-link common-carousel__content--item"
      href={href}
      aria-label={ariaLabel ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay ?? 0}ms` }}
    >
      <div className="media">
        <div className="media__image">
          <div className="common-media cover">
            <img src={post.image.src} alt={post.image.alt ?? post.title} loading="lazy" />
          </div>
        </div>
        <div className="media__content">
          <div className="label">{post.categoryLabel}</div>
        </div>
      </div>
      <div className="content">
        <div className="content__title">
          <div className="h4">{post.title}</div>
          <ArrowIcon />
        </div>
        <div className="content__description">
          <div className="p">
            <span className="clamp">{post.description}</span>
          </div>
        </div>
      </div>
    </a>
  );
}