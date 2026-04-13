import type { CSSProperties } from "react";
import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import { getHomePageSeo } from "@/lib/home-page-seo";
import { useI18n } from "@/lib/i18n";
import { pageEntryMotionTimings } from "@/lib/motion";
import { usePageSeo } from "@/lib/seo";

type IndexProps = {
  heroReady?: boolean;
  useIntroTimings?: boolean;
};

const Index = ({ heroReady = true, useIntroTimings = false }: IndexProps) => {
  const { locale } = useI18n();
  const pageEntryState = useIntroTimings ? (heroReady ? "ready" : "pending") : "idle";
  const pageEntryStyle = useIntroTimings
    ? ({
        "--page-entry-base-delay": `${pageEntryMotionTimings.introStartMs}ms`,
        "--page-entry-stagger": `${pageEntryMotionTimings.staggerMs}ms`,
      } as CSSProperties)
    : undefined;

  usePageSeo(getHomePageSeo(locale));

  return (
    <SiteLayout>
      <Hero introReady={heroReady} useIntroTimings={useIntroTimings} />
      <div className="page-entry-shell" data-page-entry={pageEntryState} style={pageEntryStyle}>
        <TrustStrip />
        <About />
        <Services />
        <HowWeWork />
        <Projects />
        <WhyUs />
        <FAQ />
        <ContactForm />
        <CTASection />
      </div>
    </SiteLayout>
  );
};

export default Index;
