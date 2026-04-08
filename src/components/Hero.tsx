import { cx } from "@/lib/cx";
import { useI18n } from "@/lib/i18n";
import { heroMotionDelays } from "@/lib/motion";
import { ActionLink } from "@/components/primitives/Actions";

const workspaceImage = "/hero/hero-workspace.jpg";
const workspaceImageMobile = "/hero/hero-workspace-mobile.jpg";

type HeroProps = {
  introReady?: boolean;
  useIntroTimings?: boolean;
};

const Hero = ({ introReady = true, useIntroTimings = false }: HeroProps) => {
  const { t } = useI18n();
  const heroDelays = useIntroTimings ? heroMotionDelays.intro : heroMotionDelays.default;
  const heroDelayStyle = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

  return (
    <section id="home" className="hero-section">
      <div className="hero-section-aurora" />
      <div className="hero-section-grid" />
      <div className="brand-mark-motif brand-mark-motif-hero" aria-hidden="true" />

      <div className="glow-orb section-orb section-orb-hero-a" />
      <div className="glow-orb glow-orb-b section-orb section-orb-hero-b" />

      <div className="site-shell hero-layout hero-shell">
        <div className="hero-content-stack">
          <div
            className={cx("hero-enter hero-badge-shell", !introReady && "hero-enter-pending")}
            style={heroDelayStyle(heroDelays.badge)}
          >
            <span className="hero-badge">{t.hero.badge}</span>
          </div>

          <div className="hero-copy-cluster">
            <h1 className="hero-title">
              {t.hero.words.map((word, i) => (
                <span
                  key={i}
                  className={cx("hero-enter-word hero-title-word", !introReady && "hero-enter-word-pending")}
                  style={heroDelayStyle(heroDelays.wordStart + i * heroDelays.wordStep)}
                >
                  {i === 1 ? <span className="hero-title-accent">{word}</span> : word}
                </span>
              ))}
            </h1>

            <p
              className={cx("hero-body hero-enter", !introReady && "hero-enter-pending")}
              style={heroDelayStyle(heroDelays.body)}
            >
              {t.hero.body}
            </p>
          </div>

          <div
            className={cx("hero-actions hero-enter", !introReady && "hero-enter-pending")}
            style={heroDelayStyle(heroDelays.actions)}
          >
            <ActionLink href="#contact" className="hero-primary-cta">
              {t.hero.primaryCta}
            </ActionLink>
            <ActionLink href="#projects" variant="ghost" className="hero-secondary-cta">
              {t.hero.secondaryCta}
            </ActionLink>
          </div>

          <p
            className={cx("hero-support-line hero-enter", !introReady && "hero-enter-pending")}
            style={heroDelayStyle(heroDelays.support)}
          >
            {t.hero.imageLabel}
          </p>
        </div>

        <div
          className={cx("hero-visual-column hero-enter-visual", !introReady && "hero-enter-visual-pending")}
          style={heroDelayStyle(heroDelays.visual)}
        >
          <div className="hero-visual-stage">
            <div className="hero-visual-backplate" />
            <div className="hero-visual-ring" />

            <div className="hero-visual-wrap hero-visual-wrap-square">
              <div className="hero-visual-shell">
                <div className="hero-visual-rim" />
                <div className="hero-visual-mask card-neon-border">
                  <img
                    src={workspaceImage}
                    srcSet={`${workspaceImageMobile} 640w, ${workspaceImage} 1024w`}
                    sizes="(max-width: 767px) 72vw, (max-width: 1023px) 28rem, 32rem"
                    alt={t.hero.imageLabel}
                    className="hero-visual-image"
                    width={1024}
                    height={1024}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                  <div className="hero-visual-vignette" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
