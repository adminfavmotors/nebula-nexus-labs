import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const About = () => {
  const ref = useScrollReveal(0.15);
  const { t } = useI18n();

  return (
    <Section id="about" tone="light" ref={ref}>
      <div className="about-layout mb-12 md:mb-14">
        <SectionTitle
          tone="light"
          revealClassName="reveal-element"
          className="max-w-[22ch] text-[clamp(22px,3vw,32px)] leading-[1.1] tracking-[-0.045em] sm:max-w-[21ch] lg:max-w-[20ch] 2xl:max-w-[21ch]"
          delay="0.05"
        >
          <span>{t.about.titleLine1} </span>
          <span>{t.about.titleLine2start}</span>
          <span className="inline-block text-[#0059ff]">{t.about.titleLine2accent}</span>
          <span>{t.about.titleLine2end} </span>
          <span>{t.about.titleLine3}</span>
        </SectionTitle>
        <div className="about-theses flex w-full flex-col gap-4 self-center">
          {t.about.theses.map((item, i) => (
            <div key={i} className="reveal-left" data-delay={String(0.15 + i * 0.15)}>
              <div className="about-thesis-card flex items-start gap-4">
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
      <div className="reveal-element" data-delay="0.2">
        <div className="about-section-bridge" aria-hidden="true">
          <span className="about-section-bridge__accent" />
        </div>
      </div>
    </Section>
  );
};

export default About;
