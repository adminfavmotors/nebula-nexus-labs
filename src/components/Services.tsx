import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const Services = () => {
  const ref = useScrollReveal();
  const { t } = useI18n();

  return (
    <Section id="services" tone="light" ref={ref}>
      <SectionTitle tone="light" revealClassName="reveal-element" className="mb-12 max-w-[18ch] md:mb-14 md:max-w-[20ch]" delay="0.05">
        {t.services.title}
      </SectionTitle>

      <div className="space-y-0">
        {t.services.items.map((service, i) => (
          <div key={i}>
            <div className="section-divider" />
            <div
              className="reveal-left group -mx-3 flex flex-wrap items-start gap-4 rounded-xl px-3 py-6 transition-colors duration-300 hover:bg-primary/[0.04] sm:-mx-4 sm:flex-nowrap sm:items-center sm:gap-5 sm:px-4"
              data-delay={String(i * 0.07)}
            >
              <span className="min-w-7 font-body text-[13px] font-semibold text-[#2979ff]">{service.num}</span>
              <span className="heading-balance min-w-0 flex-1 max-w-[24ch] font-body text-[18px] font-semibold leading-snug text-[#0a0a0a] sm:max-w-none">
                {service.name}
              </span>
              <span className="section-copy-light order-4 w-full pl-8 sm:hidden">{service.price}</span>
              <span className="section-copy-light hidden shrink-0 md:block">{service.price}</span>

              <div className="icon-circle ml-auto shrink-0 group-hover:bg-primary group-hover:shadow-[0_0_16px_rgba(0,89,255,0.6)] sm:ml-0">
                <ArrowRight size={16} className="text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
            </div>
          </div>
        ))}
        <div className="section-divider" />
      </div>
    </Section>
  );
};

export default Services;
