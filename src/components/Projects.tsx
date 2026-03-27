import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { IconButton } from "@/components/primitives/Actions";
import { cx } from "@/lib/cx";

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const [offset, setOffset] = useState(0);
  const { t } = useI18n();
  const visibleItems = t.projects.items.map((_, index) => t.projects.items[(index + offset) % t.projects.items.length]);

  return (
    <Section id="projects" tone="light" ref={ref}>
      <SectionHeader
        tone="light"
        title={t.projects.title}
        titleRevealClassName="reveal-element"
        titleDelay="0.05"
        className="items-center"
        action={
          <div className="reveal-element flex flex-wrap items-center gap-3 sm:gap-4" data-delay="0.1">
            <a href="#contact" className="section-link-light hidden sm:block">
              {t.projects.viewAll}
            </a>
            <IconButton
              onClick={() => setOffset((current) => (current - 1 + t.projects.items.length) % t.projects.items.length)}
              aria-label={t.projects.previousLabel}
            >
              <ChevronLeft size={16} className="text-primary" />
            </IconButton>
            <IconButton
              onClick={() => setOffset((current) => (current + 1) % t.projects.items.length)}
              aria-label={t.projects.nextLabel}
            >
              <ChevronRight size={16} className="text-primary" />
            </IconButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((project, i) => (
          <SurfaceCard
            key={`${project.name}-${i}`}
            className={cx(
              "project-showcase-card reveal-element group cursor-pointer",
              i === 0
                ? "project-showcase-featured lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.18fr)_minmax(15rem,0.82fr)] lg:items-stretch"
                : "project-showcase-stack",
            )}
            data-delay={String(i * 0.12)}
          >
            <div className={cx("project-preview-surface", i === 0 ? "min-h-[18rem] sm:min-h-[20rem] lg:min-h-full" : "min-h-[14rem]")}>
              <span className="absolute bottom-3 left-4 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#7a9acc]">
                {t.projects.imageLabel}
              </span>
            </div>
            <div
              className={cx(
                "flex flex-col items-start gap-3 p-7 sm:p-8",
                i === 0 ? "justify-between border-t border-[#e6ecfa] bg-[#f8fbff] lg:border-l lg:border-t-0" : "justify-end",
              )}
            >
              <span
                className={cx(
                  "heading-balance measure-card min-w-0 font-body font-semibold leading-snug",
                  i === 0 ? "max-w-[16ch] text-[clamp(24px,2.8vw,34px)] leading-[1.02]" : "sm:max-w-[19ch] lg:max-w-[18ch]",
                )}
              >
                {project.name}
              </span>
              <span className="tag-pill shrink-0">{project.tag}</span>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
