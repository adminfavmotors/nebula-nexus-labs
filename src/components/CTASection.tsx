import { CircleHelp, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/primitives/Section";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";
import { ActionLink } from "@/components/primitives/Actions";

const CTASection = () => {
  const { t } = useI18n();

  return (
    <Section tone="deep" className="section-deep-focus" pageEntryOrder={8}>
      <div className="cta-card-grid">
        <SurfaceCard variant="deep" className="cta-card">
          <div className="cta-card-stack">
            <div className="icon-circle">
              <MessageCircle size={20} className="icon-circle-glyph" />
            </div>
            <div className="cta-card-copy-cluster">
              <h2 className="cta-card-title">
                {t.cta.title}
              </h2>
              <p className="cta-card-copy">{t.cta.body}</p>
            </div>
            <div className="cta-card-actions">
              <ActionLink href="#contact">{t.cta.button}</ActionLink>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard variant="deep" className="cta-card">
          <div className="cta-card-stack">
            <div className="icon-circle">
              <CircleHelp size={20} className="icon-circle-glyph" />
            </div>
            <div className="cta-card-copy-cluster">
              <h2 className="cta-card-title cta-card-title-compact">
                {t.cta.availabilityTitle}
              </h2>
              <p className="cta-card-copy cta-card-copy-wide">
                {t.cta.availabilityBody}
              </p>
            </div>
            <div className="cta-card-actions cta-card-actions-wide">
              <ActionLink href="#contact" className="cta-card-action-button">
                <MessageCircle size={14} /> {t.cta.quickActions.form}
              </ActionLink>
              <ActionLink href="#faq" variant="ghost" className="cta-card-action-button">
                <CircleHelp size={14} /> {t.cta.quickActions.faq}
              </ActionLink>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </Section>
  );
};

export default CTASection;
