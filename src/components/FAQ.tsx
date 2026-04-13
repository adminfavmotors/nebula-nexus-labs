import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { ActionButton } from "@/components/primitives/Actions";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const { t } = useI18n();
  const { openContactOverlay } = useContactOverlay();

  return (
    <Section id="faq" tone="light" className="section-light-atmosphere" pageEntryOrder={6}>
      <div className="faq-layout">
        <div className="faq-intro-panel">
          <div className="faq-intro-copy">
            <SectionTitle tone="light" className="faq-title">
              {t.faq.title}
            </SectionTitle>
            <p className="faq-intro-text section-copy-light">{t.faq.email}</p>
          </div>

          <ActionButton
            className="faq-contact-button"
            onClick={openContactOverlay}
            aria-label={t.nav.cta}
          >
            {t.nav.cta}
          </ActionButton>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `faq-trigger-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={i}>
                <div className="faq-divider" />
                <button
                  type="button"
                  id={triggerId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="faq-item-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="faq-item-question">
                    {item.question}
                  </span>
                  <ChevronDown size={18} className="faq-item-chevron" />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  data-state={isOpen ? "open" : "closed"}
                  className="faq-item-panel"
                >
                  <div className="faq-item-body">
                    <p className="section-copy-light copy-pretty measure-copy-wide faq-item-copy">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="faq-divider" />
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
