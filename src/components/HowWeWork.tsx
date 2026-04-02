import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const HowWeWork = () => {
  const { t } = useI18n();

  return (
    <Section id="process" tone="deep" className="section-deep-grid">
      <div className="glow-orb right-[10%] top-[20%] h-[200px] w-[200px] opacity-25 blur-[100px]" />
      <div className="glow-orb glow-orb-b bottom-[10%] left-[5%] h-[150px] w-[150px] opacity-25 blur-[80px]" />

      <SectionHeader
        tone="deep"
        title={
          <Reveal as="span" delay={0.05} className="inline-block">
            {t.howWeWork.title}
          </Reveal>
        }
        titleClassName="max-w-[20ch] md:max-w-[22ch]"
        action={
          <Reveal as={ActionLink} href="#contact" variant="ghost" className="px-5 py-2 text-sm" delay={0.1}>
            {t.howWeWork.link}
          </Reveal>
        }
      />

      <div className="process-grid grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.howWeWork.steps.map((step, i) => (
          <Reveal as={SurfaceCard} key={i} variant="deep" className="relative p-7 sm:p-8" delay={i * 0.12}>
            <div className="glow-orb -right-4 -top-4 h-[100px] w-[100px] opacity-25 blur-[60px]" />
            <span className="font-display text-[76px] font-bold leading-none text-white/90">{step.num}</span>
            <h3 className="heading-balance measure-tight mb-2 mt-4 font-body font-semibold text-foreground">{step.title}</h3>
            <p className="section-copy-dark copy-pretty measure-card">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default HowWeWork;
