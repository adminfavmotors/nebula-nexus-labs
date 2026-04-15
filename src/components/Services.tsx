import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getLocalizedServicePath } from "@/lib/locale-routes";
import { getServiceCatalog } from "@/lib/service-catalog";
import { Section, SectionTitle } from "@/components/primitives/Section";

const Services = () => {
  const { locale, t } = useI18n();
  const services = getServiceCatalog(locale);

  return (
    <Section id="services" tone="light" className="section-light-listing" pageEntryOrder={2}>
      <SectionTitle tone="light" className="services-title">
        {t.services.title}
      </SectionTitle>

      <div className="services-list-shell">
        {services.map((service, i) => (
          <div key={i}>
            <div className="section-divider" />
            <Link
              to={getLocalizedServicePath(locale, service.slug)}
              className="services-item"
            >
              <span className="services-item-number">
                {service.num}
              </span>
              <span className="services-item-title">
                {service.listName}
              </span>
              <span className="services-item-price services-item-price-mobile">{service.priceFrom}</span>
              <span className="services-item-price services-item-price-desktop">
                {service.priceFrom}
              </span>

              <div className="icon-circle services-item-icon">
                <ArrowRight size={16} className="services-item-arrow" />
              </div>
            </Link>
          </div>
        ))}
        <div className="section-divider" />
      </div>
    </Section>
  );
};

export default Services;
