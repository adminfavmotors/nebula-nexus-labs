import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-[clamp(36px,5vw,64px)] tracking-tight font-bold text-[#0a0a0a]">
        {count}
        <span className="text-primary">{suffix}</span>
      </span>
      <p className="mt-1 font-body text-sm font-light text-[#4a5568]">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useScrollReveal(0.15);
  const { t } = useI18n();

  return (
    <Section id="about" tone="light" className="pt-4 md:pt-6" ref={ref}>
      <div className="mb-16 grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16">
        <SectionTitle
          tone="light"
          revealClassName="reveal-element"
          className="max-w-[14.5ch] text-[clamp(24px,3.35vw,54px)] leading-[1.03] tracking-[-0.045em]"
          delay="0.05"
        >
          <span className="block md:whitespace-nowrap">{t.about.titleLine1}</span>
          <br />
          <span className="block md:whitespace-nowrap">
            <span>{t.about.titleLine2start}</span>
            <span className="text-[#0059ff]">{t.about.titleLine2accent}</span>
            <span>{t.about.titleLine2end}</span>
          </span>
          <br />
          <span className="block md:whitespace-nowrap">{t.about.titleLine3}</span>
        </SectionTitle>
        <div className="flex w-full max-w-[50rem] flex-col gap-4 self-center lg:justify-self-end">
          {t.about.theses.map((item, i) => (
            <div key={i} className="reveal-left" data-delay={String(0.15 + i * 0.15)}>
              <div className="about-thesis-card flex items-start gap-4">
                <span className="mt-0.5 shrink-0 font-display text-[13px] font-bold tracking-widest text-primary">
                  {item.num}
                </span>
                <span className="font-body text-[14px] font-medium leading-relaxed text-[#e8f0ff]">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal-element flex flex-col items-center justify-center gap-12 md:flex-row md:gap-0" data-delay="0.3">
        <StatItem {...t.about.stats[0]} />
        <div className="mx-12 hidden h-16 w-px bg-[linear-gradient(180deg,transparent,#c4d0e8,transparent)] md:block" />
        <StatItem {...t.about.stats[1]} />
        <div className="mx-12 hidden h-16 w-px bg-[linear-gradient(180deg,transparent,#c4d0e8,transparent)] md:block" />
        <StatItem {...t.about.stats[2]} />
      </div>
    </Section>
  );
};

export default About;
