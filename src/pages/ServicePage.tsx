import { useEffect, type MouseEvent } from "react";
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
import { usePageSeo } from "@/lib/seo";
import { getServicePageStructuredData } from "@/lib/service-page-seo";
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
  const pagePath = `/uslugi/${canonicalSlug ?? slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  usePageSeo({
    title: detail?.metaTitle ?? service?.metaTitle ?? "NODE48",
    description: detail?.metaDescription ?? service?.metaDescription ?? "",
    path: pagePath,
    structuredData: getServicePageStructuredData({
      locale,
      slug,
      serviceName: service?.listName ?? "NODE48",
      title: detail?.metaTitle ?? service?.metaTitle ?? "NODE48",
      description: detail?.metaDescription ?? service?.metaDescription ?? "",
    }),
  });

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
      <main className="bg-[#f5f7ff] text-[#0a0a0a]">
        <section className="hero-section service-page-hero relative overflow-hidden">
          <div className="glow-orb left-[12%] top-[12%] h-[240px] w-[240px] opacity-20 blur-[120px]" />
          <div className="glow-orb glow-orb-b bottom-[10%] right-[14%] h-[220px] w-[220px] opacity-20 blur-[120px]" />

          <div className="site-shell">
            <div className="service-page-breadcrumbs">
              <Link to="/" className="service-page-breadcrumb-link">
                NODE48
              </Link>
              <span className="service-page-breadcrumb-separator">/</span>
              <Link to="/#services" className="service-page-breadcrumb-link">
                {ui.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="site-shell hero-layout service-page-hero-shell">
            <div className="service-page-hero-content">
              <span className="hero-badge cursor-default">{ui.eyebrow}</span>

              <div className="flex flex-wrap gap-3">
                <span className="tag-pill">{service.listName}</span>
                <span className="tag-pill">{service.priceFrom}</span>
              </div>

              <h1 className="service-page-hero-title text-foreground">{detail.heroTitle}</h1>

              <p className="section-copy-dark copy-pretty service-page-hero-copy">{detail.heroLead}</p>

              <div className="flex flex-wrap gap-4">
                <ActionLink href="#contact" onClick={handleContactClick}>
                  {detail.heroCta}
                </ActionLink>
                <Link to="/#services" className="btn-ghost">
                  {ui.secondaryCta}
                </Link>
              </div>
            </div>

            <SurfaceCard variant="summary" className="service-page-summary-card p-7 sm:p-8 lg:p-10">
              <p className="service-page-overline mb-3 text-[#8fb4ff]">
                {copy.heroSummaryTitle}
              </p>
              <h2 className="service-page-section-title mb-4 text-foreground">{service.listName}</h2>
              <p className="service-page-summary-price mb-6 text-white">
                {detail.pricingPrice}
              </p>
              <div className="glow-divider mb-6" />
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
        </section>

        <Section tone="light" className="service-page-section">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:gap-10">
            <div className="space-y-5">
              <h2 className="service-page-section-title text-[#0a0a0a]">{detail.audienceTitle}</h2>
              <div className="service-page-prose">
                {detail.audienceIntro.map((paragraph) => (
                  <p key={paragraph} className="section-copy-light copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <SurfaceCard variant="editorial" spotlight className="self-start p-6 sm:p-7">
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
          <div className="mb-10 md:mb-12">
            <h2 className="service-page-section-title text-foreground">{detail.deliverablesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {detail.deliverablesItems.map((item, index) => (
              <SurfaceCard key={item.title} variant="deep" spotlight className="relative p-6 sm:p-7">
                <span className="service-page-overline text-[#8fb4ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="service-page-card-title mt-4 text-white">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="section-copy-dark copy-pretty service-page-card-copy mt-4">{item.body}</p>
                ) : null}
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section tone="light" className="service-page-section">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10">
            <div className="space-y-5">
              <h2 className="service-page-section-title text-[#0a0a0a]">{detail.processTitle}</h2>

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

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {detail.processSteps.map((step, index) => (
                <SurfaceCard key={step.title} variant="editorial" spotlight className="service-page-step-card p-5 sm:p-6">
                  <div className="service-page-step-grid">
                    <span className="service-page-step-number">{String(index + 1).padStart(2, "0")}.</span>
                    <div className="space-y-3">
                      <h3 className="service-page-card-title text-[#0a0a0a]">
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
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SurfaceCard variant="deep" className="p-7 sm:p-8">
              <h2 className="service-page-section-title mb-5 text-foreground">{detail.pricingTitle}</h2>
              <p className="mb-6 font-display text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[2rem]">
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

            <SurfaceCard variant="deep" className="p-7 sm:p-8">
              <h2 className="service-page-section-title mb-5 text-foreground">{detail.closingTitle}</h2>
              <div className="service-page-prose mb-8">
                {detail.closingBody.map((paragraph) => (
                  <p key={paragraph} className="section-copy-dark copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
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

          <div className="mt-6 xl:mt-8">
            <SurfaceCard variant="deep" className="p-7 sm:p-8">
              <p className="section-copy-dark copy-pretty service-page-copy mb-6">{copy.relatedBody}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/uslugi/${item.slug}`}
                    className="service-page-related-card"
                  >
                    <p className="service-page-related-number">{item.num}</p>
                    <h3 className="service-page-related-title text-white">{item.listName}</h3>
                    <p className="section-copy-dark service-page-card-copy mt-3">{item.priceFrom}</p>
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
