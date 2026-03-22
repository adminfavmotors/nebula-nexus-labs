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
    <section className="section-deep section-spacing" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="card-surface reveal-element flex min-h-[280px] flex-col justify-between p-10" data-delay="0">
            <div>
              <h2 className="mb-4 font-display text-[clamp(24px,3vw,36px)] font-bold text-foreground">
                {t.cta.title}
              </h2>
              <p className="section-copy-dark max-w-sm">{t.cta.body}</p>
            </div>
            <div className="mt-8">
              <a href="#contact" className="btn-primary">{t.cta.button}</a>
            </div>
          </div>

          <div className="cta-panel reveal-element relative flex min-h-[280px] flex-col justify-between p-10" data-delay="0.15">
            <div className="glow-orb -right-10 -top-10 h-[200px] w-[200px] bg-white opacity-[0.15] blur-[80px]" />
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-[clamp(24px,3vw,36px)] font-bold text-white">
                {t.cta.availabilityTitle}
              </h2>
              <p className="max-w-sm font-body text-sm font-light leading-relaxed text-white/70">
                {t.cta.availabilityBody}
              </p>
            </div>
            <div className="relative z-10 mt-8 flex gap-4">
              <a href="#contact" className="cta-action">
                <MessageCircle size={14} /> {quickActions.form}
              </a>
              <a href="#faq" className="cta-action">
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
