import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Zap, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const WhyUs = () => {
  const ref = useScrollReveal(0.12);
  const { t } = useI18n();
  const items = [
    { icon: Shield, ...t.whyUs.items[0] },
    { icon: Zap, ...t.whyUs.items[1] },
    { icon: Users, ...t.whyUs.items[2] },
  ];

  return (
    <section id="why-us" className="section-deep section-spacing relative overflow-hidden" ref={ref}>
      <div className="glow-orb right-[15%] top-0 h-[300px] w-[300px] opacity-20 blur-[120px]" />
      <div className="glow-orb glow-orb-b bottom-0 left-[10%] h-[200px] w-[200px] opacity-20 blur-[100px]" />
      <div className="container mx-auto px-6">
        <h2 className="section-title-dark reveal-element mb-10" data-delay="0.05">
          {t.whyUs.title}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="card-surface reveal-element relative p-8" data-delay={String(i * 0.12)}>
              <div className="glow-orb -left-6 -top-6 h-[100px] w-[100px] opacity-25 blur-[60px]" />
              <div className="icon-circle mb-6">
                <item.icon size={20} className="text-primary" />
              </div>
              <h3 className="mb-2 font-body font-semibold text-foreground">{item.title}</h3>
              <p className="section-copy-dark">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
