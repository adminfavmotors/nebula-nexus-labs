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
      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2">
        <div className="reveal-element" data-delay="0">
          <SectionTitle tone="light" className="mb-5 md:mb-6">
            {t.faq.title}
          </SectionTitle>
          <div className="space-y-3 font-body text-sm font-light text-[#4a5568]">
            <p>{t.faq.email}</p>
            <p>{t.faq.phone}</p>
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
                  <span className={`font-body text-[15px] font-semibold transition-colors duration-300 ${isOpen ? "text-primary" : "text-[#0a0a0a]"}`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`ml-4 shrink-0 text-[#7a9acc] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0">
                    <p className="pb-6 font-body text-sm font-light leading-relaxed text-[#4a5568]">
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
