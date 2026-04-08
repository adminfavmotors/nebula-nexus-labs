import { Shield, Zap, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";

const WhyUs = () => {
  const { t } = useI18n();
  const items = [
    { icon: Shield, ...t.whyUs.items[0] },
    { icon: Zap, ...t.whyUs.items[1] },
    { icon: Users, ...t.whyUs.items[2] },
  ];

  return (
    <Section id="why-us" tone="deep" className="section-deep-focus">
      <div className="glow-orb section-orb section-orb-why-a" />
      <div className="glow-orb glow-orb-b section-orb section-orb-why-b" />

      <Reveal as={SectionTitle} tone="deep" className="why-us-title" delay={0.05}>
        {t.whyUs.title}
      </Reveal>
      <div className="why-us-grid">
        {items.map((item, i) => (
          <Reveal
            as={SurfaceCard}
            key={i}
            variant="deep"
            className="why-us-card"
            delay={i * 0.12}
          >
            <div className="why-us-card-stack">
              <div className="icon-circle">
                <item.icon size={20} className="icon-circle-glyph" />
              </div>
              <h3 className="feature-card-title">{item.title}</h3>
              <p className="section-copy-dark copy-pretty why-us-card-copy">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default WhyUs;
