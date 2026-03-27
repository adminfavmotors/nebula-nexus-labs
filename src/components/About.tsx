import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const StatItem = ({ value, suffix, label, className = "" }: { value: number; suffix: string; label: string; className?: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className={`metric-cell text-center ${className}`}>
      <span ref={ref} className="font-display text-[clamp(36px,5vw,64px)] tracking-tight font-bold text-[#0a0a0a]">
        {count}
        <span className="text-primary">{suffix}</span>
      </span>
      <p className="section-copy-light mt-2">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useScrollReveal(0.15);
  const { t } = useI18n();

  return (
    <Section id="about" tone="light" ref={ref}>
      <div className="mb-12 grid grid-cols-1 items-center gap-8 md:mb-14 md:gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-12">
        <SectionTitle
          tone="light"
          revealClassName="reveal-element"
          className="max-w-[19ch] text-[clamp(22px,3vw,32px)] leading-[1.06] tracking-[-0.045em] sm:max-w-[18ch] lg:max-w-[16.5ch]"
          delay="0.05"
        >
          <span>{t.about.titleLine1} </span>
          <span>{t.about.titleLine2start}</span>
          <span className="inline-block text-[#0059ff]">{t.about.titleLine2accent}</span>
          <span>{t.about.titleLine2end} </span>
          <span>{t.about.titleLine3}</span>
        </SectionTitle>
        <div className="flex w-full flex-col gap-4 self-center lg:max-w-[36rem] lg:justify-self-end">
          {t.about.theses.map((item, i) => (
            <div key={i} className="reveal-left" data-delay={String(0.15 + i * 0.15)}>
              <div className="about-thesis-card flex items-start gap-4 lg:max-w-[33rem]">
                <span className="mt-0.5 shrink-0 font-display text-[13px] font-bold tracking-widest text-primary">
                  {item.num}
                </span>
                <span className="section-copy-dark copy-pretty measure-copy text-[0.94rem] font-medium text-[#e8f0ff]">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="metrics-band reveal-element" data-delay="0.3">
        <div className="grid grid-cols-1 divide-y divide-[#dbe6fb] md:grid-cols-3 md:divide-x md:divide-y-0">
          <StatItem {...t.about.stats[0]} className="mx-auto max-w-[15rem]" />
          <StatItem {...t.about.stats[1]} className="mx-auto max-w-[15rem]" />
          <StatItem {...t.about.stats[2]} className="mx-auto max-w-[15rem]" />
        </div>
      </div>
    </Section>
  );
};

export default About;
