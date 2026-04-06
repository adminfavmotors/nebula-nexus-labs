import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const HowWeWork = () => {
  const { t } = useI18n();

  return (
    <Section id="process" tone="deep" className="section-deep-grid">
      <div className="glow-orb section-orb section-orb-process-a" />
      <div className="glow-orb glow-orb-b section-orb section-orb-process-b" />

      <SectionHeader
        tone="deep"
        title={
          <Reveal as="span" delay={0.05} className="inline-block">
            {t.howWeWork.title}
          </Reveal>
        }
        titleClassName="process-title"
        action={
          <Reveal as={ActionLink} href="#contact" variant="ghost" className="section-header-action" delay={0.1}>
            {t.howWeWork.link}
          </Reveal>
        }
      />

      <div className="process-grid grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.howWeWork.steps.map((step, i) => (
          <Reveal as={SurfaceCard} key={i} variant="deep" className="process-card" delay={i * 0.12}>
            <div className="glow-orb section-orb section-orb-process-card" />
            <span className="process-step-number">{step.num}</span>
            <h3 className="heading-balance measure-tight mb-2 mt-4 font-body font-semibold text-foreground">{step.title}</h3>
            <p className="section-copy-dark copy-pretty measure-card">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default HowWeWork;
