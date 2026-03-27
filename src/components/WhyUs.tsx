import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Zap, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";

const WhyUs = () => {
  const ref = useScrollReveal(0.12);
  const { t } = useI18n();
  const items = [
    { icon: Shield, ...t.whyUs.items[0] },
    { icon: Zap, ...t.whyUs.items[1] },
    { icon: Users, ...t.whyUs.items[2] },
  ];

  return (
    <Section id="why-us" tone="deep" className="relative overflow-hidden" ref={ref}>
      <div className="glow-orb right-[15%] top-0 h-[300px] w-[300px] opacity-20 blur-[120px]" />
      <div className="glow-orb glow-orb-b bottom-0 left-[10%] h-[200px] w-[200px] opacity-20 blur-[100px]" />

      <SectionTitle tone="deep" revealClassName="reveal-element" className="mb-12 max-w-[18ch] md:mb-14 md:max-w-[19ch]" delay="0.05">
        {t.whyUs.title}
      </SectionTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <SurfaceCard key={i} className="reveal-element relative p-7 sm:p-8" data-delay={String(i * 0.12)}>
            <div className="glow-orb -left-6 -top-6 h-[100px] w-[100px] opacity-25 blur-[60px]" />
            <div className="icon-circle mb-5">
              <item.icon size={20} className="text-primary" />
            </div>
            <h3 className="heading-balance mb-2 max-w-[16ch] font-body font-semibold text-foreground">{item.title}</h3>
            <p className="section-copy-dark copy-pretty">{item.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
};

export default WhyUs;
