import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";
import ContactFormPanel from "@/components/contact/ContactFormPanel";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);
  const { t } = useI18n();

  return (
    <Section id="contact" tone="light" ref={ref} containerClassName="contact-shell">
      <SectionTitle
        tone="light"
        revealClassName="reveal-element"
        className="mx-auto mb-10 max-w-[16ch] text-center md:mb-12 md:max-w-[17ch] 2xl:max-w-[18ch]"
        delay="0.05"
      >
        {t.contact.title}
      </SectionTitle>
      <ContactFormPanel mode="section" className="reveal-element" data-delay="0.15" />
    </Section>
  );
};

export default ContactForm;
