import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";
import NotFound from "@/pages/NotFound";
import { useI18n } from "@/lib/i18n";
import { getServiceBySlug, getServiceCatalog, getServicePageUi } from "@/lib/service-pages";
import { usePageSeo } from "@/lib/seo";

const ServicePage = () => {
  const { slug = "" } = useParams();
  const { locale } = useI18n();
  const service = getServiceBySlug(locale, slug);
  const catalog = getServiceCatalog(locale);
  const ui = getServicePageUi(locale);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!service) {
    return <NotFound />;
  }

  usePageSeo({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/uslugi/${slug}`,
  });

  const related = catalog.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <SiteLayout>
      <main className="bg-[#f5f7ff] text-[#0a0a0a]">
        <section className="hero-section relative overflow-hidden pt-32 md:pt-36">
          <div className="glow-orb left-[12%] top-[12%] h-[240px] w-[240px] opacity-20 blur-[120px]" />
          <div className="glow-orb glow-orb-b bottom-[10%] right-[14%] h-[220px] w-[220px] opacity-20 blur-[120px]" />

          <div className="site-shell hero-layout pb-16 md:pb-20">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-white/72">
                <Link to="/" className="font-body text-sm hover:text-white">
                  NODE48
                </Link>
                <span>/</span>
                <a href="/#services" className="font-body text-sm hover:text-white">
                  {ui.secondaryCta}
                </a>
              </div>

              <span className="hero-badge cursor-default">{ui.eyebrow}</span>

              <div className="flex flex-wrap gap-3">
                <span className="tag-pill">{service.listName}</span>
                <span className="tag-pill">{service.priceFrom}</span>
              </div>

              <h1 className="heading-balance max-w-[13ch] font-display text-[clamp(2.65rem,5vw,5.2rem)] leading-[1.02] tracking-[-0.04em] text-foreground">
                {service.heroTitle}
              </h1>

              <p className="section-copy-dark measure-copy-wide">
                {service.heroLead}
              </p>

              <div className="flex flex-wrap gap-4">
                <ActionLink href="#contact">{ui.primaryCta}</ActionLink>
                <ActionLink href="/#services" variant="ghost">
                  {ui.secondaryCta}
                </ActionLink>
              </div>
            </div>

            <SurfaceCard className="p-7 sm:p-8 lg:p-10">
              <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.8rem] font-medium tracking-[0.12em] text-white/78">
                {service.priceFrom}
              </div>
              <h2 className="heading-balance mb-4 max-w-[18ch] font-display text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.06] text-foreground">
                {service.listName}
              </h2>
              <p className="section-copy-dark measure-copy-wide">{service.intro}</p>
              <div className="glow-divider my-7" />
              <ul className="space-y-3">
                {service.scopeItems.slice(0, 3).map((item) => (
                  <li key={item} className="section-copy-dark flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>
        </section>

        <Section tone="light">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="space-y-5">
              <p className="font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {ui.fitBadge}
              </p>
              <h2 className="heading-balance measure-title section-title-light">{service.idealForTitle}</h2>
              <p className="section-copy-light measure-copy-wide">{service.intro}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {service.idealForItems.map((item) => (
                <SurfaceCard key={item} className="p-6 sm:p-7">
                  <p className="section-copy-light copy-pretty">{item}</p>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="deep">
          <div className="mb-10 md:mb-12">
            <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#8fb4ff]">
              {ui.scopeBadge}
            </p>
            <h2 className="heading-balance max-w-[18ch] font-display text-[clamp(2rem,4vw,2.9rem)] leading-[1.04] text-foreground">
              {service.scopeTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {service.scopeItems.map((item, index) => (
              <SurfaceCard key={item} className="relative p-6 sm:p-7">
                <div className="glow-orb -right-5 -top-5 h-[90px] w-[90px] opacity-20 blur-[60px]" />
                <span className="font-display text-[0.9rem] font-bold tracking-[0.2em] text-[#8fb4ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="section-copy-dark copy-pretty mt-4">{item}</p>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
            <SurfaceCard className="p-7 sm:p-8">
              <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {ui.pricingBadge}
              </p>
              <h2 className="heading-balance mb-5 max-w-[18ch] font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.06] text-[#0a0a0a]">
                {service.pricingTitle}
              </h2>
              <ul className="space-y-4">
                {service.pricingItems.map((item) => (
                  <li key={item} className="section-copy-light flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>

            <SurfaceCard className="p-7 sm:p-8">
              <p className="mb-3 font-body text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {ui.relatedTitle}
              </p>
              <p className="section-copy-light measure-copy-wide mb-6">{ui.relatedBody}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/uslugi/${item.slug}`}
                    className="rounded-[1.25rem] border border-[#dbe6fb] bg-[#f8fbff] p-5 transition-colors duration-300 hover:border-[#0059ff]"
                  >
                    <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.16em] text-primary">{item.num}</p>
                    <h3 className="heading-balance font-body text-[1.02rem] font-semibold text-[#0a0a0a]">{item.listName}</h3>
                    <p className="section-copy-light mt-3">{item.priceFrom}</p>
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
