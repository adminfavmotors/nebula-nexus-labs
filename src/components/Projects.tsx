import { useEffect, useState, type CSSProperties } from "react";
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
    align: "start",
    loop: items.length > 3,
    duration: 26,
    dragFree: false,
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
            <IconButton onClick={() => emblaApi?.scrollPrev()} aria-label={t.projects.previousLabel}>
              <ChevronLeft size={16} className="text-primary" />
            </IconButton>
            <IconButton onClick={() => emblaApi?.scrollNext()} aria-label={t.projects.nextLabel}>
              <ChevronRight size={16} className="text-primary" />
            </IconButton>
          </div>
        }
      />

      <div className="project-carousel-shell reveal-element" data-delay="0.12">
        <div className="project-carousel-viewport" ref={emblaRef}>
          <div className="project-carousel-track">
            {items.map((project) => (
              <div className="project-carousel-slide" key={`${project.name}-${project.href}`}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-carousel-link"
                  aria-label={`${t.projects.openLabel}: ${project.name}`}
                >
                  <SurfaceCard spotlight className="project-card project-card-surface card-neon-border">
                    <div
                      className="project-card-preview"
                      style={
                        {
                          "--project-from": project.palette.from,
                          "--project-to": project.palette.to,
                          "--project-accent": project.palette.accent,
                        } as CSSProperties
                      }
                    >
                      <img
                        src={project.preview.src}
                        alt={project.name}
                        className="project-card-preview-image"
                        style={{ objectPosition: project.preview.objectPosition ?? "center top" }}
                        loading="lazy"
                      />
                      <div className="project-card-preview-image-tint" />
                      <div className="project-card-preview-vignette" />

                      <div className="project-card-preview-bar">
                        <span className="project-card-preview-dots" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </span>
                        <span className="project-card-domain">{project.domain}</span>
                      </div>

                      <div className="project-card-preview-body">
                        <div className="project-card-preview-stack">
                          <span className="project-card-kicker">{project.tag}</span>
                          <strong className="project-card-preview-title">{project.name}</strong>
                          <p className="project-card-preview-summary">{project.summary}</p>
                        </div>

                        <div className="project-card-preview-chip-row" aria-hidden="true">
                          <span className="project-card-preview-chip">{project.location}</span>
                          <span className="project-card-preview-chip project-card-preview-chip-accent">{project.tag}</span>
                        </div>
                      </div>
                    </div>

                    <div className="project-card-content">
                      <div className="project-card-meta">
                        <span className="tag-pill shrink-0">{project.location}</span>
                        <span className="project-card-location">{project.tag}</span>
                      </div>

                      <div className="project-card-footer">
                        <span className="heading-balance project-card-title">{project.name}</span>
                        <span className="project-card-link">
                          {t.projects.openLabel}
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </SurfaceCard>
                </a>
              </div>
            ))}
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
            aria-label={`${t.projects.nextLabel}: ${items[index]?.name ?? index + 1}`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
