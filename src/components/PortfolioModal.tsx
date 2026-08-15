import type { PortfolioItem } from "@/data/portfolio";
import PlusIcon from "./PlusIcon";

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
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
            <div className="common-modal-media spotlight animate">
              <div className="common-media">
                <img src={item.logo.src} alt={item.logo.alt ?? item.title} loading="lazy" />
              </div>
            </div>
          </div>
          <div className="scroller scroller--info">
            <div data-label="Name" className="common-modal-title animate highlighted">
              <div className="h3">
                <div>{item.title}</div>
              </div>
            </div>
            <div data-label="Category" className="common-modal-title animate">
              <div className="h3-alt">
                <div>{item.categoryLabel}</div>
              </div>
            </div>
            {item.description ? (
              <div className="common-modal-description animate">
                <div className="label mid-grey">description</div>
                <div className="p description-text">{item.description}</div>
              </div>
            ) : null}
          </div>
          {item.link.href ? (
            <div className="scroller scroller--external">
              <div className="common-modal-social animate">
                <div>
                  <a
                    className="a-div has-link h3"
                    href={item.link.href}
                    aria-label={item.link.ariaLabel ?? item.link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{item.link.label}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}