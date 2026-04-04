import { CircleHelp, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const CTASection = () => {
  const { t } = useI18n();

  return (
    <Section tone="deep" className="section-deep-focus">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Reveal as={SurfaceCard} variant="deep" className="h-full p-5 sm:p-6" delay={0}>
          <div className="flex h-full flex-col items-start gap-4">
            <div className="icon-circle">
              <MessageCircle size={20} className="text-primary" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="heading-balance max-w-[13.4ch] font-display text-[clamp(1.9rem,3vw,2.85rem)] font-bold leading-[1.02] tracking-[-0.05em] text-foreground">
                {t.cta.title}
              </h2>
              <p className="section-copy-dark copy-pretty max-w-[35ch]">{t.cta.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink href="#contact">{t.cta.button}</ActionLink>
            </div>
          </div>
        </Reveal>

        <Reveal as={SurfaceCard} variant="deep" className="h-full p-5 sm:p-6" delay={0.08}>
          <div className="flex h-full flex-col items-start gap-4">
            <div className="icon-circle">
              <CircleHelp size={20} className="text-primary" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="heading-balance max-w-[11.2ch] font-display text-[clamp(1.9rem,2.9vw,2.7rem)] font-bold leading-[1.02] tracking-[-0.05em] text-foreground">
                {t.cta.availabilityTitle}
              </h2>
              <p className="section-copy-dark copy-pretty max-w-[37ch]">
                {t.cta.availabilityBody}
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-3">
              <ActionLink href="#contact" className="w-full justify-center sm:w-auto">
                <MessageCircle size={14} /> {t.cta.quickActions.form}
              </ActionLink>
              <ActionLink href="#faq" variant="ghost" className="w-full justify-center sm:w-auto">
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
