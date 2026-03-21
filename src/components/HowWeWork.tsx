import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";

const HowWeWork = () => {
  const ref = useScrollReveal(0.12);
  const { t } = useI18n();

  return (
    <section id="process" className="section-deep py-12 md:py-16 relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[200px] h-[200px] top-[20%] right-[10%]" style={{ opacity: 0.25, filter: "blur(100px)" }} />
      <div className="glow-orb glow-orb-b w-[150px] h-[150px] bottom-[10%] left-[5%]" style={{ opacity: 0.25, filter: "blur(80px)" }} />

      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="reveal-element section-label block mb-4" data-delay="0">{t.howWeWork.eyebrow}</span>
            <h2 className="reveal-element font-display text-[44px] text-foreground font-bold" data-delay="0.05">
              {t.howWeWork.title}
            </h2>
          </div>
          <a href="#contact" className="reveal-element btn-ghost text-sm px-5 py-2" data-delay="0.1">
            {t.howWeWork.link}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.howWeWork.steps.map((step, i) => (
            <div
              key={i}
              className="reveal-element card-surface p-8 relative"
              data-delay={String(i * 0.12)}
            >
              <div className="glow-orb w-[100px] h-[100px] -top-4 -right-4" style={{ opacity: 0.25, filter: "blur(60px)" }} />
              <span className="font-display text-[80px] leading-none font-bold" style={{ color: "#ffffff", opacity: 0.9 }}>{step.num}</span>
              <h3 className="font-body font-semibold text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#7a9acc" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
