import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { ActionButton } from "@/components/primitives/Actions";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const { t } = useI18n();
  const { openContactOverlay } = useContactOverlay();

  return (
    <Section id="faq" tone="light" className="section-light-atmosphere">
      <div className="faq-layout">
        <Reveal className="faq-intro-panel">
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
        </Reveal>

        <div className="faq-list space-y-0">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="faq-divider" />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center justify-between py-7 text-left md:py-8"
                >
                  <span className={isOpen ? "faq-item-question faq-item-question-open" : "faq-item-question faq-item-question-closed"}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={isOpen ? "faq-item-chevron faq-item-chevron-open" : "faq-item-chevron"}
                  />
                </button>
                <div className={isOpen ? "faq-item-panel faq-item-panel-open" : "faq-item-panel faq-item-panel-closed"}>
                  <div className="min-h-0">
                    <p className="section-copy-light copy-pretty measure-copy-wide pb-7 md:pb-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="faq-divider" />
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
