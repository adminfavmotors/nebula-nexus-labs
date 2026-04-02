import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";

const About = () => {
  const { t } = useI18n();

  return (
    <Section id="about" tone="light" className="section-light-editorial">
      <div className="about-layout mb-14 md:mb-16">
        <Reveal
          as={SectionTitle}
          tone="light"
          className="max-w-[21ch] text-[clamp(24px,3.15vw,34px)] leading-[1.06] tracking-[-0.05em] sm:max-w-[20ch] lg:max-w-[19ch] 2xl:max-w-[20ch]"
          delay={0.05}
        >
          <span>{t.about.titleLine1} </span>
          <span>{t.about.titleLine2start}</span>
          <span className="inline-block text-[#0059ff]">{t.about.titleLine2accent}</span>
          <span>{t.about.titleLine2end} </span>
          <span>{t.about.titleLine3}</span>
        </Reveal>
        <div className="about-theses flex w-full flex-col gap-5 self-center md:gap-6">
          {t.about.theses.map((item, i) => (
            <Reveal key={i} direction="left" delay={0.15 + i * 0.15}>
              <div className="about-thesis-card flex items-start gap-4 md:gap-5">
                <span className="mt-0.5 shrink-0 font-display text-[13px] font-bold tracking-[0.18em] text-primary">
                  {item.num}
                </span>
                <span className="section-copy-dark copy-pretty measure-copy text-[0.99rem] font-medium text-[#e8f0ff]">
                  {item.text}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={0.2}>
        <div className="about-section-bridge" aria-hidden="true">
          <span className="about-section-bridge__accent" />
        </div>
      </Reveal>
    </Section>
  );
};

export default About;
