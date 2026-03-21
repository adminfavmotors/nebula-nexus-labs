import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Services = () => {
  const ref = useScrollReveal();
  const { t } = useI18n();

  return (
    <section id="services" className="section-light py-16 md:py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <span className="reveal-element section-label block mb-4" data-delay="0">{t.services.eyebrow}</span>
        <h2 className="reveal-element font-display text-[44px] mb-10 font-bold" data-delay="0.05" style={{ color: "#0a0a0a" }}>
          {t.services.title}
        </h2>

        <div className="space-y-0">
          {t.services.items.map((s, i) => (
            <div key={i}>
              <div style={{ height: "1px", background: "rgba(0,89,255,0.12)" }} />
              <div
                className="reveal-left group flex items-center gap-5 py-5 px-4 -mx-4 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-primary/[0.04]"
                data-delay={String(i * 0.07)}
              >
                <span className="font-body text-[13px] font-semibold" style={{ color: "#2979ff", minWidth: "28px" }}>{s.num}</span>

                <span className="font-body font-semibold text-[18px] flex-1" style={{ color: "#0a0a0a" }}>{s.name}</span>
                <span className="font-body text-[14px] hidden sm:block" style={{ color: "#4a5568" }}>{s.price}</span>

                <div className="icon-circle group-hover:bg-primary group-hover:shadow-[0_0_16px_rgba(0,89,255,0.6)]">
                  <ArrowRight size={16} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: "1px", background: "rgba(0,89,255,0.12)" }} />
        </div>
      </div>
    </section>
  );
};

export default Services;
