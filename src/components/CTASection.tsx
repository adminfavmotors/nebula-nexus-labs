import { CircleHelp, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const CTASection = () => {
  const { t } = useI18n();

  return (
    <Section tone="deep" className="cta-section-stage">
      <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-7">
        <Reveal as={SurfaceCard} variant="deep" className="cta-card cta-card-primary p-6 sm:p-7 lg:p-8" delay={0}>
          <div className="cta-card-inner">
            <div className="cta-card-copy cta-card-copy-primary">
              <h2 className="heading-balance max-w-[15.8ch] font-display text-[clamp(24px,2.8vw,35px)] font-bold leading-[1.01] tracking-[-0.05em] text-foreground sm:max-w-[16.8ch]">
                {t.cta.title}
              </h2>
              <p className="section-copy-dark copy-pretty cta-card-body">{t.cta.body}</p>
            </div>
            <div className="cta-card-actions">
              <ActionLink href="#contact">{t.cta.button}</ActionLink>
            </div>
          </div>
        </Reveal>

        <Reveal as={SurfaceCard} variant="deep" className="cta-card cta-card-accent p-6 sm:p-7 lg:p-8" delay={0}>
          <div className="brand-mark-motif brand-mark-motif-cta" aria-hidden="true" />
          <div className="glow-orb -right-10 -top-10 h-[180px] w-[180px] bg-white opacity-[0.14] blur-[80px]" />
          <div className="cta-card-inner relative z-10">
            <div className="cta-card-copy cta-card-copy-accent">
              <h2 className="heading-balance max-w-[11.8ch] font-display text-[clamp(24px,2.8vw,35px)] font-bold leading-[1.01] tracking-[-0.05em] text-white sm:max-w-[12.4ch]">
                {t.cta.availabilityTitle}
              </h2>
              <p className="section-copy-accent copy-pretty cta-card-body">
                {t.cta.availabilityBody}
              </p>
            </div>
            <div className="cta-card-actions cta-card-actions-accent">
              <ActionLink href="#contact" variant="cta" className="w-full justify-center sm:w-auto">
                <MessageCircle size={14} /> {t.cta.quickActions.form}
              </ActionLink>
              <ActionLink href="#faq" variant="cta" className="w-full justify-center sm:w-auto">
                <CircleHelp size={14} /> {t.cta.quickActions.faq}
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default CTASection;
