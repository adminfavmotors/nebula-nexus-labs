import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  "Placeholder question one?",
  "Placeholder question two?",
  "Placeholder question three?",
  "Placeholder question four?",
  "Placeholder question five?",
];

const FAQ = () => {
  const ref = useScrollReveal(0.1);
  const [open, setOpen] = useState(0);

  return (
    <section className="section-light py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="reveal-element" data-delay="0">
            <span className="section-label block mb-4">FAQ</span>
            <h2 className="font-display text-[44px] font-bold mb-6">
              Placeholder FAQ Title
            </h2>
            <div className="space-y-2 font-body font-light text-sm" style={{ color: "#4a5568" }}>
              <p>placeholder@email.com</p>
              <p>+48 000 000 000</p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {faqs.map((q, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="reveal-element" data-delay={String(i * 0.08)}>
                  <div className="faq-separator" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,89,255,0.2), transparent)" }} />
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span
                      className={`font-body font-semibold text-[15px] transition-colors duration-300 ${
                        isOpen ? "faq-question active" : "faq-question"
                      }`}
                      style={{ color: isOpen ? "#0059ff" : "#0a0a0a" }}
                    >
                      {q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`faq-chevron transition-transform duration-400 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: "#7a9acc" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-[400ms]"
                    style={{
                      maxHeight: isOpen ? "120px" : "0",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                    }}
                  >
                    <p className="font-body font-light text-sm faq-answer pb-5 leading-relaxed" style={{ color: "#4a5568" }}>
                      Placeholder answer text. A sentence or two of filler content goes here to demonstrate the accordion behavior.
                    </p>
                  </div>
                </div>
              );
            })}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,89,255,0.2), transparent)" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
