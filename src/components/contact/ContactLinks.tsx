import { Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { businessPhone, businessPhoneHref, contactEmail, contactEmailHref } from "@/lib/contact-config";

const ContactLinks = () => {
  const { t } = useI18n();

  return (
    <div className="contact-links">
      <a href={contactEmailHref} className="contact-link" aria-label={`${t.contact.emailLabel}: ${contactEmail}`}>
        <Mail className="contact-link-icon" aria-hidden="true" />
        <span className="contact-link-copy">
          <span className="contact-link-label">{t.contact.emailLabel}</span>
          <span className="contact-link-value">{contactEmail}</span>
        </span>
      </a>
      <a href={businessPhoneHref} className="contact-link" aria-label={`${t.contact.phoneLabel}: ${businessPhone}`}>
        <Phone className="contact-link-icon" aria-hidden="true" />
        <span className="contact-link-copy">
          <span className="contact-link-label">{t.contact.phoneLabel}</span>
          <span className="contact-link-value">{businessPhone}</span>
        </span>
      </a>
    </div>
  );
};

export default ContactLinks;
