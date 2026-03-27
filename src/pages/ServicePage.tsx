import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";
import NotFound from "@/pages/NotFound";
import { useI18n } from "@/lib/i18n";
import { getServiceCatalog, getServiceBySlug, getServicePageUi } from "@/lib/service-pages";
import { getServicePageDetail } from "@/lib/service-page-details";
import { usePageSeo } from "@/lib/seo";

const pageCopy = {
  pl: {
    heroSummaryTitle: "W skrócie",
    audienceBadge: "Dla kogo",
    deliverablesBadge: "Co dostajesz",
    processBadge: "Proces",
    pricingBadge: "Budżet i zakres",
    durationLabel: "Czas realizacji",
    relatedTitle: "Zobacz też",
    relatedBody: "Jeśli zakres projektu jest większy albo mniejszy, możesz przejść do pokrewnej usługi i porównać kierunek.",
  },
  en: {
    heroSummaryTitle: "At a glance",
    audienceBadge: "Who it is for",
    deliverablesBadge: "What you get",
    processBadge: "Process",
    pricingBadge: "Budget and scope",
    durationLabel: "Timeline",
    relatedTitle: "Explore related services",
    relatedBody: "If the project scope is bigger or smaller, compare it with another relevant service page.",
  },
} as const;

const ServicePage = () => {
  const { slug = "" } = useParams();
  const { locale } = useI18n();
  const service = getServiceBySlug(locale, slug);
  const detail = getServicePageDetail(locale, slug);
  const catalog = getServiceCatalog(locale);
  const ui = getServicePageUi(locale);
  const copy = pageCopy[locale];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  usePageSeo({
    title: detail?.metaTitle ?? service?.metaTitle ?? "NODE48",
    description: detail?.metaDescription ?? service?.metaDescription ?? "",
    path: `/uslugi/${slug}`,
  });

  if (!service || !detail) {
    return <NotFound />;
  }

  const related = catalog.filter((item) => item.slug !== slug).slice(0, 3);
  const heroHighlights = detail.deliverablesItems.slice(0, 3);

  return (
    <SiteLayout>
      <main className="bg-[#f5f7ff] text-[#0a0a0a]">
        <section className="hero-section service-page-hero relative overflow-hidden">
          <div className="glow-orb left-[12%] top-[12%] h-[240px] w-[240px] opacity-20 blur-[120px]" />
          <div className="glow-orb glow-orb-b bottom-[10%] right-[14%] h-[220px] w-[220px] opacity-20 blur-[120px]" />

          <div className="site-shell hero-layout service-page-hero-shell">
            <div className="service-page-hero-content">
              <div className="flex flex-wrap items-center gap-3 text-white/72">
                <Link to="/" className="font-body text-sm text-white/72 hover:text-white">
                  NODE48
                </Link>
                <span className="text-white/45">/</span>
                <a href="/#services" className="font-body text-sm text-white/72 hover:text-white">
                  {ui.secondaryCta}
                </a>
              </div>

              <span className="hero-badge cursor-default">{ui.eyebrow}</span>

              <div className="flex flex-wrap gap-3">
                <span className="tag-pill">{service.listName}</span>
                <span className="tag-pill">{service.priceFrom}</span>
              </div>

              <h1 className="service-page-hero-title text-foreground">{detail.heroTitle}</h1>

              <p className="section-copy-dark copy-pretty service-page-hero-copy">{detail.heroLead}</p>

              <div className="flex flex-wrap gap-4">
                <ActionLink href="#contact">{detail.heroCta}</ActionLink>
                <ActionLink href="/#services" variant="ghost">
                  {ui.secondaryCta}
                </ActionLink>
              </div>
            </div>

            <SurfaceCard className="service-page-summary-card p-7 sm:p-8 lg:p-10">
              <p className="mb-3 font-body text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#8fb4ff]">
                {copy.heroSummaryTitle}
              </p>
              <h2 className="service-page-section-title mb-4 text-foreground">{service.listName}</h2>
              <p className="mb-6 font-display text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[1.9rem]">
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
              <p className="font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {copy.audienceBadge}
              </p>
              <h2 className="service-page-section-title text-[#0a0a0a]">{detail.audienceTitle}</h2>
              <div className="service-page-prose">
                {detail.audienceIntro.map((paragraph) => (
                  <p key={paragraph} className="section-copy-light copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <SurfaceCard className="self-start p-6 sm:p-7">
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
            <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#8fb4ff]">
              {copy.deliverablesBadge}
            </p>
            <h2 className="service-page-section-title text-foreground">{detail.deliverablesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {detail.deliverablesItems.map((item, index) => (
              <SurfaceCard key={item.title} className="relative p-6 sm:p-7">
                <span className="font-display text-[0.85rem] font-bold tracking-[0.2em] text-[#8fb4ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 heading-balance font-display text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
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
              <p className="font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {copy.processBadge}
              </p>
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
                <SurfaceCard key={step.title} className="service-page-step-card p-5 sm:p-6">
                  <div className="service-page-step-grid">
                    <span className="service-page-step-number">{String(index + 1).padStart(2, "0")}.</span>
                    <div className="space-y-3">
                      <h3 className="heading-balance font-display text-[1.15rem] font-semibold leading-[1.16] tracking-[-0.03em] text-[#0a0a0a]">
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
            <SurfaceCard className="p-7 sm:p-8">
              <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#8fb4ff]">
                {copy.pricingBadge}
              </p>
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

            <SurfaceCard className="p-7 sm:p-8">
              <h2 className="service-page-section-title mb-5 text-foreground">{detail.closingTitle}</h2>
              <div className="service-page-prose mb-8">
                {detail.closingBody.map((paragraph) => (
                  <p key={paragraph} className="section-copy-dark copy-pretty service-page-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <ActionLink href="#contact">{detail.closingPrimaryCta}</ActionLink>
                {detail.closingSecondaryCta ? (
                  <ActionLink href="#contact" variant="ghost">
                    {detail.closingSecondaryCta}
                  </ActionLink>
                ) : null}
              </div>
            </SurfaceCard>
          </div>

          <div className="mt-6 xl:mt-8">
            <SurfaceCard className="p-7 sm:p-8">
              <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#8fb4ff]">
                {copy.relatedTitle}
              </p>
              <p className="section-copy-dark copy-pretty service-page-copy mb-6">{copy.relatedBody}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/uslugi/${item.slug}`}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-[#0059ff]"
                  >
                    <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.16em] text-[#8fb4ff]">{item.num}</p>
                    <h3 className="heading-balance font-body text-[1.02rem] font-semibold text-white">{item.listName}</h3>
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
