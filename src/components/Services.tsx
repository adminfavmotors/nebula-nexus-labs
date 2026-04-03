import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-pages";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";

const Services = () => {
  const { locale, t } = useI18n();
  const services = getServiceCatalog(locale);

  return (
    <Section id="services" tone="light" className="section-light-listing">
      <Reveal as={SectionTitle} tone="light" className="mb-12 max-w-[19ch] md:mb-14 md:max-w-[20ch]" delay={0.05}>
        {t.services.title}
      </Reveal>

      <div className="services-list-shell space-y-0">
        {services.map((service, i) => (
          <div key={i}>
            <div className="section-divider" />
            <Reveal
              as={Link}
              to={`/uslugi/${service.slug}`}
              direction="left"
              delay={i * 0.07}
              className="group -mx-3 grid min-h-[8.5rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-xl px-3 py-8 transition-colors duration-300 hover:bg-primary/[0.04] sm:-mx-4 sm:min-h-[9.5rem] sm:px-4 sm:py-9 lg:grid-cols-[auto_minmax(0,1fr)_minmax(10.5rem,13rem)_auto] lg:gap-x-10 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(12rem,14.5rem)_auto]"
            >
              <span className="min-w-7 self-center font-body text-[12px] font-semibold tracking-[0.16em] text-[#2979ff] lg:text-[13px]">
                {service.num}
              </span>
              <span className="heading-balance min-w-0 max-w-[23ch] font-body text-[19px] font-semibold leading-[1.18] tracking-[-0.022em] text-[#0a0a0a] md:max-w-[31ch] md:text-[20px] lg:max-w-[38ch] 2xl:max-w-[44ch]">
                {service.listName}
              </span>
              <span className="section-copy-light col-start-2 mt-0.5 text-[0.98rem] lg:hidden">{service.priceFrom}</span>
              <span className="section-copy-light hidden self-center whitespace-nowrap pr-3 text-right text-[0.98rem] lg:block xl:pr-4">
                {service.priceFrom}
              </span>

              <div className="icon-circle row-span-2 shrink-0 self-center group-hover:bg-primary group-hover:shadow-[0_0_16px_rgba(0,89,255,0.6)] lg:row-span-1 lg:ml-1 xl:ml-2">
                <ArrowRight size={16} className="text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
            </Reveal>
          </div>
        ))}
        <div className="section-divider" />
      </div>
    </Section>
  );
};

export default Services;
