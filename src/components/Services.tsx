import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Services = () => {
  const ref = useScrollReveal();
  const { t } = useI18n();

  return (
    <section id="services" className="section-light section-spacing" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="section-title-light reveal-element mb-10" data-delay="0.05">
          {t.services.title}
        </h2>

        <div className="space-y-0">
          {t.services.items.map((service, i) => (
            <div key={i}>
              <div className="section-divider" />
              <div
                className="reveal-left group -mx-4 flex cursor-pointer items-center gap-5 rounded-xl px-4 py-5 transition-colors duration-300 hover:bg-primary/[0.04]"
                data-delay={String(i * 0.07)}
              >
                <span className="min-w-7 font-body text-[13px] font-semibold text-[#2979ff]">{service.num}</span>
                <span className="flex-1 font-body text-[18px] font-semibold text-[#0a0a0a]">{service.name}</span>
                <span className="hidden font-body text-[14px] text-[#4a5568] sm:block">{service.price}</span>

                <div className="icon-circle group-hover:bg-primary group-hover:shadow-[0_0_16px_rgba(0,89,255,0.6)]">
                  <ArrowRight size={16} className="text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
              </div>
            </div>
          ))}
          <div className="section-divider" />
        </div>
      </div>
    </section>
  );
};

export default Services;
