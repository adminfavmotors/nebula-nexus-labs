import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { getProjectCases } from "@/lib/project-cases";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { IconButton } from "@/components/primitives/Actions";

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale, t } = useI18n();
  const items = getProjectCases(locale);

  const carouselItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    return items.map((_, offset) => items[(activeIndex + offset) % items.length]);
  }, [activeIndex, items]);

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
              onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)}
              aria-label={t.projects.previousLabel}
            >
              <ChevronLeft size={16} className="text-primary" />
            </IconButton>
            <IconButton
              onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
              aria-label={t.projects.nextLabel}
            >
              <ChevronRight size={16} className="text-primary" />
            </IconButton>
          </div>
        }
      />

      <div className="project-carousel reveal-element" data-delay="0.12">
        {carouselItems.map((project, index) => {
          const slotClass =
            index === 0
              ? "project-carousel-card-active"
              : index === 1
                ? "project-carousel-card-next"
                : index === items.length - 1
                  ? "project-carousel-card-prev"
                  : "project-carousel-card-hidden";

          return (
            <a
              key={`${project.name}-${project.href}`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={`project-carousel-card ${slotClass}`}
            >
              <SurfaceCard spotlight className="project-case-card group h-full cursor-pointer">
                <div
                  className="project-preview-surface project-preview-case min-h-[14rem] sm:min-h-[15rem]"
                  style={
                    {
                      "--project-from": project.palette.from,
                      "--project-to": project.palette.to,
                      "--project-accent": project.palette.accent,
                    } as CSSProperties
                  }
                >
                  <div className="project-preview-topline">
                    <span className="project-preview-domain">{project.domain}</span>
                    <span className="project-preview-live">
                      {t.projects.liveLabel}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  <div className="project-preview-copy">
                    <span className="project-preview-kicker">{project.location}</span>
                    <strong className="project-preview-title">{project.name}</strong>
                    <p className="project-preview-summary">{project.summary}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 p-7 sm:p-8">
                  <span className="heading-balance measure-card min-w-0 font-body font-semibold leading-snug sm:max-w-[19ch] lg:max-w-[18ch]">
                    {project.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag-pill shrink-0">{project.tag}</span>
                    <span className="project-card-link">
                      {t.projects.openLabel}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </SurfaceCard>
            </a>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
        {items.map((project, index) => (
          <button
            key={`${project.href}-dot`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`project-carousel-dot ${index === activeIndex ? "project-carousel-dot-active" : ""}`}
            aria-label={`${t.projects.openLabel}: ${project.name}`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
