import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";
import ContactFormPanel from "@/components/contact/ContactFormPanel";

const ContactForm = () => {
  const { t } = useI18n();

  return (
    <Section id="contact" tone="light" className="section-light-atmosphere" containerClassName="contact-shell">
      <Reveal
        as={SectionTitle}
        tone="light"
        className="mx-auto mb-12 max-w-[15ch] text-center text-[clamp(2.05rem,4vw,2.95rem)] leading-[1.04] tracking-[-0.04em] md:mb-14 md:max-w-[16ch] 2xl:max-w-[17ch]"
        delay={0.05}
      >
        {t.contact.title}
      </Reveal>
      <Reveal as={ContactFormPanel} mode="section" delay={0.15} />
    </Section>
  );
};

export default ContactForm;
