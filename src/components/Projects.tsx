import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { getProjectCases } from "@/lib/project-cases";
import { cx } from "@/lib/cx";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { IconButton } from "@/components/primitives/Actions";

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const { locale, t } = useI18n();
  const items = getProjectCases(locale);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: items.length > 2,
    duration: 28,
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

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (!emblaApi || index === selectedIndex) {
      return;
    }

    event.preventDefault();
    emblaApi.scrollTo(index);
  };

  return (
    <Section id="projects" tone="light" ref={ref}>
      <SectionHeader
        tone="light"
        title={t.projects.title}
        titleClassName="max-w-[18ch] md:max-w-[20ch]"
        titleRevealClassName="reveal-element"
        titleDelay="0.05"
        className="items-center"
        action={
          <div className="reveal-element flex flex-wrap items-center gap-3 sm:gap-4" data-delay="0.1">
            <span className="project-collection-pill hidden sm:inline-flex">{t.projects.collectionLabel}</span>
            <IconButton
              onClick={() => emblaApi?.scrollPrev()}
              aria-label={t.projects.previousLabel}
            >
              <ChevronLeft size={16} className="text-primary" />
            </IconButton>
            <IconButton
              onClick={() => emblaApi?.scrollNext()}
              aria-label={t.projects.nextLabel}
            >
              <ChevronRight size={16} className="text-primary" />
            </IconButton>
          </div>
        }
      />

      <div className="project-carousel-shell reveal-element" data-delay="0.12">
        <div className="project-carousel-viewport" ref={emblaRef}>
          <div className="project-carousel-track">
            {items.map((project, index) => {
              const isActive = index === selectedIndex;

              return (
                <div className="project-carousel-slide" key={`${project.name}-${project.href}`}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => handleCardClick(event, index)}
                    className="project-carousel-link"
                    aria-label={`${t.projects.openLabel}: ${project.name}`}
                  >
                    <SurfaceCard
                      spotlight
                      className={cx(
                        "project-case-card card-neon-border project-showcase-card",
                        isActive ? "project-showcase-card-active" : "project-showcase-card-inactive",
                      )}
                    >
                      <div
                        className="project-preview-surface project-preview-case"
                        style={
                          {
                            "--project-from": project.palette.from,
                            "--project-to": project.palette.to,
                            "--project-accent": project.palette.accent,
                          } as CSSProperties
                        }
                      >
                        <div className="project-preview-browser">
                          <div className="project-preview-browser-topline">
                            <span className="project-preview-browser-dots">
                              <span />
                              <span />
                              <span />
                            </span>
                            <span className="project-preview-domain">{project.domain}</span>
                            <span className="project-preview-live">
                              {t.projects.liveLabel}
                              <ArrowUpRight size={14} />
                            </span>
                          </div>

                          <div className="project-preview-browser-body">
                            <div className="project-preview-copy">
                              <span className="project-preview-kicker">{project.location}</span>
                              <strong className="project-preview-title">{project.name}</strong>
                              <p className="project-preview-summary">{project.summary}</p>
                            </div>

                            <div className="project-preview-metric-stack" aria-hidden="true">
                              <span className="project-preview-metric project-preview-metric-strong">{project.tag}</span>
                              <span className="project-preview-metric">{project.location}</span>
                              <span className="project-preview-metric">Live</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="project-card-body">
                        <div className="project-card-meta">
                          <span className="tag-pill shrink-0">{project.tag}</span>
                          <span className="project-card-location">{project.location}</span>
                        </div>

                        <div className="project-card-bottomline">
                          <span className="heading-balance project-card-heading">{project.name}</span>
                          <span className="project-card-link">
                            {t.projects.openLabel}
                            <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </SurfaceCard>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {scrollSnaps.map((_, index) => (
          <button
            key={`project-dot-${index}`}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cx("project-carousel-dot", index === selectedIndex && "project-carousel-dot-active")}
            aria-label={`${t.projects.openLabel}: ${items[index]?.name ?? index + 1}`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
