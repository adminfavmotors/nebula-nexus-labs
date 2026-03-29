import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCase } from "@/lib/project-cases";

type PortfolioCaseCardProps = {
  item: ProjectCase;
  openLabel: string;
};

const PortfolioCaseCard = ({ item, openLabel }: PortfolioCaseCardProps) => {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="portfolio-card"
      aria-label={`${openLabel}: ${item.name}`}
      style={
        {
          "--portfolio-from": item.palette.from,
          "--portfolio-to": item.palette.to,
          "--portfolio-accent": item.palette.accent,
        } as CSSProperties
      }
    >
      <div className="portfolio-card__preview">
        <img
          src={item.preview.src}
          alt={item.name}
          className="portfolio-card__image"
          style={{ objectPosition: item.preview.objectPosition ?? "center top" }}
          loading="lazy"
        />
        <div className="portfolio-card__image-tint" />
        <div className="portfolio-card__chrome">
          <span className="portfolio-card__chrome-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="portfolio-card__domain">{item.domain}</span>
        </div>
      </div>

      <div className="portfolio-card__body">
        <div className="portfolio-card__meta">
          <span className="portfolio-card__pill">{item.location}</span>
          <span className="portfolio-card__tag">{item.tag}</span>
        </div>

        <div className="portfolio-card__copy">
          <h3 className="portfolio-card__title">{item.name}</h3>
          <p className="portfolio-card__summary">{item.summary}</p>
        </div>

        <span className="portfolio-card__cta">
          {openLabel}
          <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
};

export default PortfolioCaseCard;
