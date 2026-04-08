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
import { useI18n } from "@/lib/i18n";
import { getHomePageSeo } from "@/lib/seo-routes";
import { usePageSeo } from "@/lib/seo";

type IndexProps = {
  heroReady?: boolean;
  useIntroTimings?: boolean;
};

const Index = ({ heroReady = true, useIntroTimings = false }: IndexProps) => {
  const { locale } = useI18n();

  usePageSeo(getHomePageSeo(locale));

  return (
    <SiteLayout>
      <Hero introReady={heroReady} useIntroTimings={useIntroTimings} />
      <TrustStrip />
      <About />
      <Services />
      <HowWeWork />
      <Projects />
      <WhyUs />
      <FAQ />
      <ContactForm />
      <CTASection />
    </SiteLayout>
  );
};

export default Index;
