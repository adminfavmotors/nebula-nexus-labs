import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CircleHelp, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const CTASection = () => {
  const ref = useScrollReveal(0.15);
  const { t } = useI18n();

  return (
    <Section tone="deep" ref={ref}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SurfaceCard className="reveal-element flex min-h-[280px] flex-col justify-between p-7 sm:p-8 lg:p-9" data-delay="0">
          <div>
            <h2 className="mb-4 font-display text-[clamp(24px,3vw,36px)] font-bold text-foreground">
              {t.cta.title}
            </h2>
            <p className="section-copy-dark max-w-sm">{t.cta.body}</p>
          </div>
          <div className="mt-7">
            <ActionLink href="#contact">{t.cta.button}</ActionLink>
          </div>
        </SurfaceCard>

        <div className="cta-panel reveal-element relative flex min-h-[280px] flex-col justify-between p-7 sm:p-8 lg:p-9" data-delay="0.15">
          <div className="glow-orb -right-10 -top-10 h-[200px] w-[200px] bg-white opacity-[0.15] blur-[80px]" />
          <div className="relative z-10">
            <h2 className="mb-4 font-display text-[clamp(24px,3vw,36px)] font-bold text-white">
              {t.cta.availabilityTitle}
            </h2>
            <p className="section-copy-accent max-w-sm">
              {t.cta.availabilityBody}
            </p>
          </div>
          <div className="relative z-10 mt-7 flex flex-wrap gap-3 sm:gap-4">
            <ActionLink href="#contact" variant="cta" className="w-full justify-center sm:w-auto">
              <MessageCircle size={14} /> {t.cta.quickActions.form}
            </ActionLink>
            <ActionLink href="#faq" variant="cta" className="w-full justify-center sm:w-auto">
              <CircleHelp size={14} /> {t.cta.quickActions.faq}
            </ActionLink>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
