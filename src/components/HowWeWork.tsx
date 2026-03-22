import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const HowWeWork = () => {
  const ref = useScrollReveal(0.12);
  const { t } = useI18n();

  return (
    <Section id="process" tone="deep" className="relative overflow-hidden" ref={ref}>
      <div className="glow-orb right-[10%] top-[20%] h-[200px] w-[200px] opacity-25 blur-[100px]" />
      <div className="glow-orb glow-orb-b bottom-[10%] left-[5%] h-[150px] w-[150px] opacity-25 blur-[80px]" />

      <SectionHeader
        tone="deep"
        title={t.howWeWork.title}
        titleRevealClassName="reveal-element"
        titleDelay="0.05"
        action={
          <ActionLink href="#contact" variant="ghost" className="reveal-element px-5 py-2 text-sm" data-delay="0.1">
            {t.howWeWork.link}
          </ActionLink>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.howWeWork.steps.map((step, i) => (
          <SurfaceCard key={i} className="reveal-element relative p-8" data-delay={String(i * 0.12)}>
            <div className="glow-orb -right-4 -top-4 h-[100px] w-[100px] opacity-25 blur-[60px]" />
            <span className="font-display text-[80px] font-bold leading-none text-white/90">{step.num}</span>
            <h3 className="mb-2 mt-4 font-body font-semibold text-foreground">{step.title}</h3>
            <p className="section-copy-dark">{step.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
};

export default HowWeWork;
