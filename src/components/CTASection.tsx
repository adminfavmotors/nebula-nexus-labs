import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CircleHelp, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const CTASection = () => {
  const ref = useScrollReveal(0.15);
  const { locale, t } = useI18n();
  const quickActions =
    locale === "pl"
      ? { form: "Przejdź do formularza", faq: "Zobacz FAQ" }
      : { form: "Open the form", faq: "See FAQ" };

  return (
    <section className="section-deep py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left card */}
          <div className="reveal-element card-surface p-10 flex flex-col justify-between min-h-[280px]" data-delay="0">
            <div>
              <span className="section-label block mb-4">{t.cta.eyebrow}</span>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-foreground mb-4 font-bold">
                {t.cta.title}
              </h2>
              <p className="font-body font-light text-sm leading-relaxed max-w-sm" style={{ color: "#7a9acc" }}>
                {t.cta.body}
              </p>
            </div>
            <div className="mt-8">
              <a href="#contact" className="btn-primary">{t.cta.button}</a>
            </div>
          </div>

          {/* Right card — solid blue */}
          <div
            className="reveal-element rounded-[20px] p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            data-delay="0.15"
            style={{
              background: "#0059ff",
              boxShadow: "0 0 120px rgba(0, 89, 255, 0.5)",
            }}
          >
            <div className="glow-orb w-[200px] h-[200px] -top-10 -right-10" style={{ background: "white", opacity: 0.15, filter: "blur(80px)" }} />
            <div className="relative z-10">
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-white mb-4 font-bold">
                {t.cta.availabilityTitle}
              </h2>
              <p className="font-body font-light text-sm text-white/70 leading-relaxed max-w-sm">
                {t.cta.availabilityBody}
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/20 transition-all duration-300 active:scale-[0.97]">
                <MessageCircle size={14} /> {quickActions.form}
              </a>
              <a href="#faq" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/20 transition-all duration-300 active:scale-[0.97]">
                <CircleHelp size={14} /> {quickActions.faq}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
