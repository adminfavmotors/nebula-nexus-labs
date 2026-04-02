import { lazy, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { ViewportMount } from "@/components/primitives/ViewportMount";

const PortfolioShowcase = lazy(() => import("@/components/portfolio/PortfolioShowcase"));

const ProjectsFallback = () => (
  <div
    className="mt-8 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/[0.72] px-5 py-6 shadow-[0_18px_50px_rgba(0,31,88,0.08)] md:px-6 md:py-7"
    aria-hidden="true"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="h-4 w-28 rounded-full bg-primary/10" />
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10" />
        <div className="h-10 w-10 rounded-full bg-primary/10" />
      </div>
    </div>

    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`projects-skeleton-${index}`}
          className="min-h-[24rem] rounded-[1.35rem] border border-primary/10 bg-white/80"
        />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const { t } = useI18n();

  return (
    <Section id="projects" tone="light" className="section-light-showcase projects-stage">
      <SectionHeader
        tone="light"
        title={<Reveal as="span" delay={0.05} className="inline-block">{t.projects.title}</Reveal>}
        titleClassName="max-w-[18ch] md:max-w-[20ch]"
      />

      <div className="projects-frame">
        <ViewportMount fallback={<ProjectsFallback />}>
          <Suspense fallback={<ProjectsFallback />}>
            <PortfolioShowcase
              collectionLabel={t.projects.collectionLabel}
              openLabel={t.projects.openLabel}
              previousLabel={t.projects.previousLabel}
              nextLabel={t.projects.nextLabel}
            />
          </Suspense>
        </ViewportMount>
      </div>
    </Section>
  );
};

export default Projects;
