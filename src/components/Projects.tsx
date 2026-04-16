import { lazy, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/primitives/Section";

const PortfolioShowcase = lazy(() => import("@/components/portfolio/PortfolioShowcase"));

const ProjectsFallback = () => (
  <div className="projects-fallback" aria-hidden="true">
    <div className="projects-fallback-header">
      <div className="projects-fallback-bar" />
      <div className="projects-fallback-nav">
        <div className="projects-fallback-dot" />
        <div className="projects-fallback-dot" />
      </div>
    </div>

    <div className="projects-fallback-grid">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`projects-skeleton-${index}`} className="projects-fallback-card" />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const { t } = useI18n();

  return (
    <Section id="projects" tone="light" className="section-light-showcase projects-stage" pageEntryOrder={4}>
      <SectionHeader
        tone="light"
        title={<span className="section-title-inline">{t.projects.title}</span>}
        titleClassName="projects-title"
      />

      <div className="projects-frame">
        <Suspense fallback={<ProjectsFallback />}>
          <PortfolioShowcase
            collectionLabel={t.projects.collectionLabel}
            openLabel={t.projects.openLabel}
            previousLabel={t.projects.previousLabel}
            nextLabel={t.projects.nextLabel}
          />
        </Suspense>
      </div>
    </Section>
  );
};

export default Projects;
