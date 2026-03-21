import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Zap, Users } from "lucide-react";

const items = [
  { icon: Shield, title: "Placeholder Title", desc: "Placeholder one-line description text." },
  { icon: Zap, title: "Placeholder Title", desc: "Placeholder one-line description text." },
  { icon: Users, title: "Placeholder Title", desc: "Placeholder one-line description text." },
];

const WhyUs = () => {
  const ref = useScrollReveal(0.12);

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <span className="reveal-element section-label block mb-4" data-delay="0">DLACZEGO MY</span>
        <h2 className="reveal-element font-display text-[44px] text-foreground mb-10 font-bold" data-delay="0.05">
          Placeholder Title
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={i} className="reveal-element card-surface p-8 relative" data-delay={String(i * 0.12)}>
              <div className="glow-orb w-[100px] h-[100px] -top-6 -left-6" style={{ opacity: 0.25, filter: "blur(60px)" }} />
              <div className="icon-circle mb-6">
                <item.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-body font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#7a9acc" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
