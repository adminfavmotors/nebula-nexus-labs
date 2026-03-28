import { Layers3, MonitorSmartphone, Route, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { trustStripContent } from "@/lib/trust-strip-content";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";

const icons = [Layers3, MonitorSmartphone, Search, Route] as const;

const TrustStrip = () => {
  const ref = useScrollReveal(0.06);
  const { locale } = useI18n();
  const copy = trustStripContent[locale];

  return (
    <section className="trust-strip-section section-light" ref={ref}>
      <div className="site-shell trust-strip-shell">
        <div className="trust-strip-panel reveal-element" data-delay="0.04">
          <div className="trust-strip-intro">
            <span className="trust-strip-eyebrow">{copy.eyebrow}</span>
            <h2 className="trust-strip-title">{copy.title}</h2>
          </div>

          <div className="trust-strip-grid">
            {copy.items.map((item, index) => {
              const Icon = icons[index];

              return (
                <SurfaceCard
                  key={item.value}
                  spotlight
                  className="trust-strip-card reveal-element"
                  data-delay={String(0.08 + index * 0.07)}
                >
                  <div className="trust-strip-icon">
                    <Icon size={16} className="text-primary" />
                  </div>

                  <div className="trust-strip-copy">
                    <p className="trust-strip-value">{item.value}</p>
                    <p className="trust-strip-label">{item.label}</p>
                  </div>
                </SurfaceCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
