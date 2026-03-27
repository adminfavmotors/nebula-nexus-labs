import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";
import { cx } from "@/lib/cx";

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
        titleClassName="max-w-[18ch] md:max-w-[20ch]"
        titleRevealClassName="reveal-element"
        titleDelay="0.05"
        action={
          <ActionLink href="#contact" variant="ghost" className="reveal-element px-5 py-2 text-sm" data-delay="0.1">
            {t.howWeWork.link}
          </ActionLink>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:auto-rows-[minmax(13rem,auto)] md:grid-cols-2 xl:gap-7">
        {t.howWeWork.steps.map((step, i) => (
          <SurfaceCard
            key={i}
            className={cx(
              "process-card reveal-element relative p-6 sm:p-7",
              i === 0 && "process-card-emphasis md:row-span-2 md:min-h-[27rem]",
              i === 1 && "md:mt-6",
              i === 2 && "process-card-outline",
              i === 3 && "md:-mt-6",
            )}
            data-delay={String(i * 0.12)}
          >
            <div className="glow-orb -right-4 -top-4 h-[100px] w-[100px] opacity-25 blur-[60px]" />
            <span className="font-display text-[72px] font-bold leading-none text-white/90">{step.num}</span>
            <h3 className="heading-balance measure-tight mb-2 mt-4 font-body font-semibold text-foreground">{step.title}</h3>
            <p className="section-copy-dark copy-pretty measure-card">{step.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
};

export default HowWeWork;
