import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";
import type { ProjectCase } from "@/lib/project-cases";
import { IconButton } from "@/components/primitives/Actions";
import PortfolioCaseCard from "@/components/portfolio/PortfolioCaseCard";
import "./portfolio-carousel.css";

type PortfolioCarouselProps = {
  items: ProjectCase[];
  collectionLabel: string;
  openLabel: string;
  previousLabel: string;
  nextLabel: string;
};

const PortfolioCarousel = ({
  items,
  collectionLabel,
  openLabel,
  previousLabel,
  nextLabel,
}: PortfolioCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: items.length > 3,
    dragFree: false,
    duration: 24,
  });

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    syncState();
    emblaApi.on("select", syncState);
    emblaApi.on("reInit", syncState);

    return () => {
      emblaApi.off("select", syncState);
      emblaApi.off("reInit", syncState);
    };
  }, [emblaApi]);

  return (
    <div className="portfolio-carousel reveal-element" data-delay="0.12">
      <div className="portfolio-carousel__toolbar">
        <span className="portfolio-carousel__collection">{collectionLabel}</span>

        <div className="portfolio-carousel__actions">
          <IconButton onClick={() => emblaApi?.scrollPrev()} aria-label={previousLabel}>
            <ChevronLeft size={16} className="text-primary" />
          </IconButton>
          <IconButton onClick={() => emblaApi?.scrollNext()} aria-label={nextLabel}>
            <ChevronRight size={16} className="text-primary" />
          </IconButton>
        </div>
      </div>

      <div className="portfolio-carousel__stage">
        <div className="portfolio-carousel__stage-glow" aria-hidden="true" />

        <div className="portfolio-carousel__viewport" ref={emblaRef}>
          <div className="portfolio-carousel__track">
            {items.map((item) => (
              <div className="portfolio-carousel__slide" key={`${item.name}-${item.href}`}>
                <PortfolioCaseCard item={item} openLabel={openLabel} />
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-carousel__dots" aria-label="Portfolio pagination">
          {scrollSnaps.map((_, index) => (
            <button
              key={`portfolio-dot-${index}`}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={cx(
                "portfolio-carousel__dot",
                index === selectedIndex && "portfolio-carousel__dot--active",
              )}
              aria-label={`${nextLabel}: ${items[index]?.name ?? index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
