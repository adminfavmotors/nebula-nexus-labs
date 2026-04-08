import { type MouseEvent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";
import NotFound from "@/pages/NotFound";
import { useI18n } from "@/lib/i18n";
import { getCanonicalServiceSlug, getServiceCatalog, getServiceBySlug, getServicePageUi } from "@/lib/service-pages";
import { getServicePageDetail } from "@/lib/service-page-details";
import { getServicePageSeo } from "@/lib/seo-routes";
import { usePageSeo } from "@/lib/seo";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";
import "@/styles/service-page.css";
import "@/styles/service-page-responsive.css";

const pageCopy = {
  pl: {
    heroSummaryTitle: "W skrócie",
    durationLabel: "Czas realizacji",
    relatedBody: "Jeśli zakres projektu jest większy albo mniejszy, możesz przejść do pokrewnej usługi i porównać kierunek.",
  },
  en: {
    heroSummaryTitle: "At a glance",
    durationLabel: "Timeline",
    relatedBody: "If the project scope is bigger or smaller, compare it with another relevant service page.",
  },
} as const;

const ServicePage = () => {
  const { slug = "" } = useParams();
  const { locale } = useI18n();
  const canonicalSlug = getCanonicalServiceSlug(slug);
  const service = getServiceBySlug(locale, slug);
  const detail = getServicePageDetail(locale, slug);
  const catalog = getServiceCatalog(locale);
  const ui = getServicePageUi(locale);
  const copy = pageCopy[locale];
  const { openContactOverlay } = useContactOverlay();
  const seo =
    getServicePageSeo(locale, canonicalSlug ?? slug) ??
    {
      title: "NODE48",
      description: "",
      path: `/uslugi/${canonicalSlug ?? slug}`,
      robots: "noindex,nofollow" as const,
    };

  usePageSeo(seo);

  if (canonicalSlug && canonicalSlug !== slug) {
    return <Navigate to={`/uslugi/${canonicalSlug}`} replace />;
  }

  if (!service || !detail) {
    return <NotFound />;
  }

  const related = catalog.filter((item) => item.slug !== slug).slice(0, 3);
  const heroHighlights = detail.deliverablesItems.slice(0, 3);
  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openContactOverlay();
  };

  return (
    <SiteLayout>
      <main className="service-page-root">
        <section className="hero-section service-page-hero service-page-hero-surface">
          <div className="glow-orb section-orb section-orb-service-a" />
          <div className="glow-orb glow-orb-b section-orb section-orb-service-b" />

          <div className="site-shell service-page-hero-frame">
            <div className="service-page-breadcrumbs">
              <Link to="/" className="service-page-breadcrumb-link">
                NODE48
              </Link>
              <span className="service-page-breadcrumb-separator">/</span>
              <Link to="/#services" className="service-page-breadcrumb-link">
                {ui.secondaryCta}
              </Link>
            </div>

            <div className="service-page-hero-shell service-page-hero-grid">
              <div className="service-page-hero-content">
                <span className="hero-badge">{ui.eyebrow}</span>

                <div className="service-page-tag-row">
                  <span className="tag-pill">{service.listName}</span>
                  <span className="tag-pill">{service.priceFrom}</span>
                </div>

                <h1 className="service-page-hero-title">{detail.heroTitle}</h1>

                <p className="section-copy-dark copy-pretty service-page-hero-copy">{detail.heroLead}</p>

                <div className="service-page-action-row">
                  <ActionLink href="#contact" onClick={handleContactClick}>
                    {detail.heroCta}
                  </ActionLink>
                  <Link to="/#services" className="btn-ghost">
                    {ui.secondaryCta}
                  </Link>
                </div>
              </div>

              <SurfaceCard variant="summary" className="service-page-summary-card service-page-summary-panel">
                <p className="service-page-overline service-page-summary-overline">
                  {copy.heroSummaryTitle}
                </p>
                <h2 className="service-page-section-title service-page-summary-title">{service.listName}</h2>
                <p className="service-page-summary-price">
                  {detail.pricingPrice}
                </p>
                <div className="glow-divider service-page-summary-divider" />
                <ul className="service-page-list">
                  {heroHighlights.map((item) => (
                    <li key={item.title} className="service-page-list-item section-copy-dark service-page-card-copy">
                      <span className="service-page-list-dot" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            </div>
          </div>
        </section>

        <Section tone="light" className="service-page-section">
          <div className="service-page-audience-grid">
            <div className="service-page-section-stack">
              <h2 className="service-page-section-title">{detail.audienceTitle}</h2>
              <div className="service-page-prose">
                {detail.audienceIntro.map((paragraph) => (
                  <p key={paragraph} className="section-copy-light copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <SurfaceCard variant="editorial" spotlight className="service-page-editorial-panel">
              <ul className="service-page-list">
                {detail.audienceBullets.map((item) => (
                  <li key={item} className="service-page-list-item section-copy-light service-page-card-copy">
                    <span className="service-page-list-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>
        </Section>

        <Section tone="deep" className="service-page-section">
          <div className="service-page-section-heading-wrap">
            <h2 className="service-page-section-title service-page-section-title-deep">{detail.deliverablesTitle}</h2>
          </div>

          <div className="service-page-deliverables-grid">
            {detail.deliverablesItems.map((item, index) => (
              <SurfaceCard key={item.title} variant="deep" spotlight className="service-page-deliverable-card">
                <span className="service-page-overline">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="service-page-card-title-featured">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="service-page-card-copy-block">{item.body}</p>
                ) : null}
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section tone="light" className="service-page-section">
          <div className="service-page-process-grid">
            <div className="service-page-section-stack">
              <h2 className="service-page-section-title">{detail.processTitle}</h2>

              {detail.processIntro.length > 0 ? (
                <div className="service-page-prose">
                  {detail.processIntro.map((paragraph) => (
                    <p key={paragraph} className="section-copy-light copy-pretty service-page-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              <div className="service-page-duration">
                <span className="service-page-duration-label">{copy.durationLabel}</span>
                <p className="section-copy-light service-page-card-copy">{detail.processDuration}</p>
              </div>
            </div>

            <div className="service-page-steps-grid">
              {detail.processSteps.map((step, index) => (
                <SurfaceCard key={step.title} variant="editorial" spotlight className="service-page-step-card service-page-step-panel">
                  <div className="service-page-step-grid">
                    <span className="service-page-step-number">{String(index + 1).padStart(2, "0")}.</span>
                    <div className="service-page-step-copy">
                      <h3 className="service-page-card-title">
                        {step.title}
                      </h3>
                      {step.body ? (
                        <p className="section-copy-light copy-pretty service-page-card-copy">{step.body}</p>
                      ) : null}
                    </div>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="deep" className="service-page-section">
          <div className="service-page-related-grid">
            <SurfaceCard variant="deep" className="service-page-deep-panel">
              <h2 className="service-page-section-title service-page-panel-title">{detail.pricingTitle}</h2>
              <p className="service-page-price">
                {detail.pricingPrice}
              </p>
              <div className="service-page-prose">
                {detail.pricingBody.map((paragraph) => (
                  <p key={paragraph} className="section-copy-dark copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard variant="deep" className="service-page-deep-panel">
              <h2 className="service-page-section-title service-page-panel-title">{detail.closingTitle}</h2>
              <div className="service-page-prose service-page-prose-spacious">
                {detail.closingBody.map((paragraph) => (
                  <p key={paragraph} className="section-copy-dark copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="service-page-action-row">
                <ActionLink href="#contact" onClick={handleContactClick}>
                  {detail.closingPrimaryCta}
                </ActionLink>
                {detail.closingSecondaryCta ? (
                  <ActionLink href="#contact" variant="ghost" onClick={handleContactClick}>
                    {detail.closingSecondaryCta}
                  </ActionLink>
                ) : null}
              </div>
            </SurfaceCard>
          </div>

          <div className="service-page-related-shell">
            <SurfaceCard variant="deep" className="service-page-deep-panel">
              <p className="service-page-related-copy">{copy.relatedBody}</p>
              <div className="service-page-related-list">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/uslugi/${item.slug}`}
                    className="service-page-related-card"
                  >
                    <p className="service-page-related-number">{item.num}</p>
                    <h3 className="service-page-related-title service-page-related-title-light">{item.listName}</h3>
                    <p className="section-copy-dark service-page-card-copy service-page-related-price">{item.priceFrom}</p>
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </Section>

        <ContactForm />
      </main>
    </SiteLayout>
  );
};

export default ServicePage;
