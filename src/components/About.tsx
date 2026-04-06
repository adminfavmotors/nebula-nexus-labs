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
          className="about-title"
          delay={0.05}
        >
          <span>{t.about.titleLine1} </span>
          <span>{t.about.titleLine2start}</span>
          <span className="about-title-accent">{t.about.titleLine2accent}</span>
          <span>{t.about.titleLine2end} </span>
          <span>{t.about.titleLine3}</span>
        </Reveal>
        <div className="about-theses flex w-full flex-col gap-5 self-center md:gap-6">
          {t.about.theses.map((item, i) => (
            <Reveal key={i} direction="left" delay={0.15 + i * 0.15}>
              <div className="about-thesis-card flex items-start gap-4 md:gap-5">
                <span className="about-thesis-number">
                  {item.num}
                </span>
                <span className="about-thesis-copy">
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
