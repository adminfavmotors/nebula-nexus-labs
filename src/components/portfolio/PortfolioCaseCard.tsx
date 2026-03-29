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
          decoding="async"
          fetchPriority="low"
          sizes="(max-width: 767px) calc(100vw - 2.8rem), (max-width: 1099px) calc(50vw - 2.5rem), calc(33vw - 2.6rem)"
          draggable="false"
        />
        <div className="portfolio-card__image-tint" />
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
