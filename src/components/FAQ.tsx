import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionTitle } from "@/components/primitives/Section";

const FAQ = () => {
  const ref = useScrollReveal(0.1);
  const [open, setOpen] = useState(0);
  const { t } = useI18n();

  return (
    <Section id="faq" tone="light" ref={ref}>
      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[minmax(18rem,0.88fr)_minmax(0,1.12fr)] lg:items-start">
        <div className="reveal-element lg:max-w-[23rem]" data-delay="0">
          <div className="faq-aside-panel">
            <SectionTitle tone="light" className="mb-4 max-w-[16ch] text-[clamp(1.85rem,3.4vw,2.65rem)] md:mb-5 md:max-w-[17ch]">
              {t.faq.title}
            </SectionTitle>
            <div className="section-copy-light measure-copy space-y-3">
              <p>{t.faq.email}</p>
              <p>{t.faq.phone}</p>
            </div>
            <div className="faq-divider mt-6" />
          </div>
        </div>

        <div className="space-y-0">
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
                  <span className={`heading-balance max-w-[32ch] pr-3 font-body text-[15px] font-semibold transition-colors duration-300 ${isOpen ? "text-primary" : "text-[#0a0a0a]"}`}>
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
