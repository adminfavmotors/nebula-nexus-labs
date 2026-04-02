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
      <div className="grid items-start grid-cols-1 gap-6 md:gap-7 lg:grid-cols-2 lg:gap-8">
        <Reveal as={SurfaceCard} variant="deep" className="cta-card flex flex-col gap-7 p-7 sm:gap-8 sm:p-8 lg:p-9" delay={0}>
          <div className="cta-card-copy">
            <h2 className="heading-balance mb-5 max-w-[15ch] font-display text-[clamp(26px,3.15vw,38px)] font-bold leading-[1.03] tracking-[-0.045em] text-foreground sm:max-w-[16ch]">
              {t.cta.title}
            </h2>
            <p className="section-copy-dark copy-pretty measure-copy">{t.cta.body}</p>
          </div>
          <div>
            <ActionLink href="#contact">{t.cta.button}</ActionLink>
          </div>
        </Reveal>

        <Reveal as={SurfaceCard} variant="deep" className="cta-panel flex flex-col gap-7 p-7 sm:gap-8 sm:p-8 lg:p-9" delay={0.15}>
          <div className="brand-mark-motif brand-mark-motif-cta" aria-hidden="true" />
          <div className="glow-orb -right-10 -top-10 h-[200px] w-[200px] bg-white opacity-[0.15] blur-[80px]" />
          <div className="cta-card-copy relative z-10">
            <h2 className="heading-balance mb-5 max-w-[14ch] font-display text-[clamp(26px,3.15vw,38px)] font-bold leading-[1.03] tracking-[-0.045em] text-white sm:max-w-[15ch]">
              {t.cta.availabilityTitle}
            </h2>
            <p className="section-copy-accent copy-pretty measure-copy">
              {t.cta.availabilityBody}
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 sm:gap-4">
            <ActionLink href="#contact" variant="cta" className="w-full justify-center sm:w-auto">
              <MessageCircle size={14} /> {t.cta.quickActions.form}
            </ActionLink>
            <ActionLink href="#faq" variant="cta" className="w-full justify-center sm:w-auto">
              <CircleHelp size={14} /> {t.cta.quickActions.faq}
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default CTASection;
