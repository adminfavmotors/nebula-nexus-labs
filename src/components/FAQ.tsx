import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { ActionButton } from "@/components/primitives/Actions";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";

const FAQ = () => {
  const ref = useScrollReveal(0.1);
  const [open, setOpen] = useState(0);
  const { t } = useI18n();
  const { openContactOverlay } = useContactOverlay();

  return (
    <Section id="faq" tone="light" ref={ref}>
      <div className="faq-layout">
        <div className="faq-header reveal-element" data-delay="0">
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
        </div>

        <div className="faq-list space-y-0">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal-element" data-delay={String(i * 0.08)}>
                <div className="faq-divider" />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center justify-between py-6 text-left"
                >
                  <span className={`heading-balance max-w-[36ch] pr-3 font-body text-[15px] font-semibold transition-colors duration-300 2xl:max-w-[38ch] ${isOpen ? "text-primary" : "text-[#0a0a0a]"}`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`ml-4 shrink-0 text-[#7a9acc] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0">
                    <p className="section-copy-light copy-pretty measure-copy-wide pb-6">
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
