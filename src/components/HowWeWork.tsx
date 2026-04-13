import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const HowWeWork = () => {
  const { t } = useI18n();

  return (
    <Section id="process" tone="deep" className="section-deep-grid" pageEntryOrder={3}>
      <div className="glow-orb section-orb section-orb-process-a" />
      <div className="glow-orb glow-orb-b section-orb section-orb-process-b" />

      <SectionHeader
        tone="deep"
        title={
          <span className="section-title-inline">
            {t.howWeWork.title}
          </span>
        }
        titleClassName="process-title"
        action={
          <ActionLink href="#contact" variant="ghost" className="section-header-action">
            {t.howWeWork.link}
          </ActionLink>
        }
      />

      <div className="process-grid">
        {t.howWeWork.steps.map((step, i) => (
          <SurfaceCard key={i} variant="deep" className="process-card">
            <div className="glow-orb section-orb section-orb-process-card" />
            <span className="process-step-number">{step.num}</span>
            <h3 className="feature-card-title process-card-title">{step.title}</h3>
            <p className="section-copy-dark copy-pretty measure-card">{step.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
};

export default HowWeWork;
