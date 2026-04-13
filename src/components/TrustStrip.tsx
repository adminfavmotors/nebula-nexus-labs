import type { CSSProperties } from "react";
import { Layers3, MonitorSmartphone, Route, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { trustStripContent } from "@/lib/trust-strip-content";
import { SurfaceCard } from "@/components/primitives/SurfaceCard";

const icons = [Layers3, MonitorSmartphone, Search, Route] as const;

const TrustStrip = () => {
  const { locale } = useI18n();
  const copy = trustStripContent[locale];
  const eyebrowParts = copy.eyebrow.includes("NODE48")
    ? copy.eyebrow.split("NODE48")
    : null;
  const sectionStyle = { "--page-entry-order": 0 } as CSSProperties;

  return (
    <section className="trust-strip-section section-light" style={sectionStyle}>
      <div className="site-shell trust-strip-shell">
        <div className="trust-strip-panel">
          <div className="trust-strip-intro">
            <span className="trust-strip-eyebrow">
              {eyebrowParts ? (
                <>
                  <span>{eyebrowParts[0].trim()}</span>
                  <span className="trust-strip-eyebrow-brand">NODE48</span>
                </>
              ) : (
                copy.eyebrow
              )}
            </span>
            <h2 className="trust-strip-title">{copy.title}</h2>
          </div>

          <div className="trust-strip-grid">
            {copy.items.map((item, index) => {
              const Icon = icons[index];

              return (
                <SurfaceCard
                  key={item.value}
                  variant="showcase"
                  spotlight
                  className="trust-strip-card"
                >
                  <div className="trust-strip-icon">
                    <Icon size={16} className="icon-circle-glyph" />
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
