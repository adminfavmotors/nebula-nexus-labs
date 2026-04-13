import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const About = () => {
  const { t } = useI18n();

  return (
    <Section id="about" tone="light" className="section-light-editorial" pageEntryOrder={1}>
      <div className="about-layout">
        <SectionTitle tone="light" className="about-title">
          <span>{t.about.titleLine1} </span>
          <span>{t.about.titleLine2start}</span>
          <span className="about-title-accent">{t.about.titleLine2accent}</span>
          <span>{t.about.titleLine2end} </span>
          <span>{t.about.titleLine3}</span>
        </SectionTitle>
        <div className="about-theses">
          {t.about.theses.map((item, i) => (
            <div key={i}>
              <div className="about-thesis-card">
                <span className="about-thesis-number">
                  {item.num}
                </span>
                <span className="about-thesis-copy">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-section-bridge" aria-hidden="true">
        <span className="about-section-bridge__accent" />
      </div>
    </Section>
  );
};

export default About;
