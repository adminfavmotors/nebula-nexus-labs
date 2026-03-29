import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { getProjectCases } from "@/lib/project-cases";
import { Section, SectionHeader } from "@/components/primitives/Section";
import PortfolioCarousel from "@/components/portfolio/PortfolioCarousel";

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const { locale, t } = useI18n();
  const items = getProjectCases(locale);

  return (
    <Section id="projects" tone="light" ref={ref}>
      <SectionHeader
        tone="light"
        title={t.projects.title}
        titleClassName="max-w-[18ch] md:max-w-[20ch]"
        titleRevealClassName="reveal-element"
        titleDelay="0.05"
      />

      <PortfolioCarousel
        items={items}
        collectionLabel={t.projects.collectionLabel}
        openLabel={t.projects.openLabel}
        previousLabel={t.projects.previousLabel}
        nextLabel={t.projects.nextLabel}
      />
    </Section>
  );
};

export default Projects;
