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
      <div className="glow-orb right-[15%] top-0 h-[300px] w-[300px] opacity-20 blur-[120px]" />
      <div className="glow-orb glow-orb-b bottom-0 left-[10%] h-[200px] w-[200px] opacity-20 blur-[100px]" />

      <Reveal as={SectionTitle} tone="deep" className="mb-12 max-w-[19ch] md:mb-14 md:max-w-[21ch]" delay={0.05}>
        {t.whyUs.title}
      </Reveal>
      <div className="why-us-grid grid items-start grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            as={SurfaceCard}
            key={i}
            variant="deep"
            className="self-start p-5 sm:p-6"
            delay={i * 0.12}
          >
            <div className="why-us-card-stack">
              <div className="icon-circle">
                <item.icon size={20} className="text-primary" />
              </div>
              <h3 className="heading-balance measure-tight font-body font-semibold text-foreground">{item.title}</h3>
              <p className="section-copy-dark copy-pretty why-us-card-copy">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default WhyUs;
