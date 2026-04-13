import { useRef, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";

const About = () => {
  const { t } = useI18n();
  const thesesRef = useRef<HTMLDivElement>(null);
  useReveal(thesesRef, { threshold: 0.08 });

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
        <div ref={thesesRef} className="about-theses reveal-group">
          {t.about.theses.map((item, i) => (
            <div
              key={i}
              className="about-thesis-card reveal-item"
              style={{ "--reveal-i": i } as CSSProperties}
            >
              <span className="about-thesis-number">{item.num}</span>
              <span className="about-thesis-copy">{item.text}</span>
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
