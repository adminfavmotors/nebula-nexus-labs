import { useI18n } from "@/lib/i18n";
import { ActionLink } from "@/components/primitives/Actions";
import workspaceImage from "../../img/hero-workspace.jpg";
import workspaceImageMobile from "../../img/hero-workspace-mobile.jpg";

const Hero = () => {
  const { t } = useI18n();
  const heroDelayStyle = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div className="hero-section-aurora" />
      <div className="hero-section-mesh" />
      <div className="hero-section-grid" />
      <div className="brand-mark-motif brand-mark-motif-hero" aria-hidden="true" />

      <div className="glow-orb -top-20 left-[10%] h-[350px] w-[350px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-b left-[55%] top-[40%] h-[250px] w-[250px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-c bottom-[10%] left-[25%] h-[200px] w-[200px] opacity-30 blur-[120px]" />
      <div className="hero-section-beam" />

      <div className="site-shell hero-layout hero-shell">
        <div className="hero-content-stack">
          <div className="hero-enter inline-flex" style={heroDelayStyle(260)}>
            <span className="hero-badge cursor-default">{t.hero.badge}</span>
          </div>

          <div className="hero-copy-cluster">
            <h1 className="hero-title">
              {t.hero.words.map((word, i) => (
                <span
                  key={i}
                  className="hero-enter-word block"
                  style={heroDelayStyle(380 + i * 120)}
                >
                  {i === 1 ? <span className="hero-title-accent">{word}</span> : word}
                </span>
              ))}
            </h1>

            <p className="hero-body hero-enter" style={heroDelayStyle(840)}>
              {t.hero.body}
            </p>
          </div>

          <div className="hero-actions hero-enter" style={heroDelayStyle(980)}>
            <ActionLink href="#contact" className="hero-primary-cta">
              {t.hero.primaryCta}
            </ActionLink>
            <ActionLink href="#projects" variant="ghost" className="hero-secondary-cta">
              {t.hero.secondaryCta}
            </ActionLink>
          </div>

          <p className="hero-support-line hero-enter" style={heroDelayStyle(1120)}>
            {t.hero.imageLabel}
          </p>
        </div>

        <div className="hero-visual-column hero-enter-visual" style={heroDelayStyle(520)}>
          <div className="hero-visual-stage">
            <div className="hero-visual-backplate" />
            <div className="hero-visual-ring" />

            <div className="hero-visual-wrap hero-visual-wrap-square mt-2">
              <div className="hero-card-glow" />
              <div
                className="hero-visual-shell"
                style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
              >
                <div className="hero-visual-rim" />
                <div className="hero-visual-mask card-neon-border">
                  <div className="hero-visual-grain" />
                  <img
                    src={workspaceImage}
                    srcSet={`${workspaceImageMobile} 640w, ${workspaceImage} 1024w`}
                    sizes="(max-width: 767px) 72vw, (max-width: 1023px) 28rem, 32rem"
                    alt={t.hero.imageLabel}
                    className="hero-visual-image"
                    width={1024}
                    height={1024}
                    decoding="async"
                    fetchpriority="high"
                  />
                  <div className="hero-visual-sheen" />
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
