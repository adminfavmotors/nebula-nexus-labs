import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import { useI18n } from "@/lib/i18n";
import { usePageSeo } from "@/lib/seo";

const Index = () => {
  const { t } = useI18n();

  usePageSeo({
    title: t.meta.title,
    description: t.meta.description,
    path: "/",
  });

  return (
    <SiteLayout>
      <Hero />
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
