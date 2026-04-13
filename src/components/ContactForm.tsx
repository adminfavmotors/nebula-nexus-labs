import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";
import ContactFormPanel from "@/components/contact/ContactFormPanel";

const ContactForm = () => {
  const { t } = useI18n();

  return (
    <Section
      id="contact"
      tone="light"
      className="section-light-atmosphere"
      containerClassName="contact-shell"
      pageEntryOrder={7}
    >
      <SectionTitle tone="light" className="contact-section-title">
        {t.contact.title}
      </SectionTitle>
      <ContactFormPanel mode="section" />
    </Section>
  );
};

export default ContactForm;
