import { useI18n } from "@/lib/i18n";
import { ActionLink } from "@/components/primitives/Actions";
import workspaceImage from "../../img/hero-workspace.jpg";
import workspaceImageMobile from "../../img/hero-workspace-mobile.jpg";

const Hero = () => {
  const { t } = useI18n();

  const enterClass = (delayClass: string) =>
    `translate-y-0 opacity-100 transition-all [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${delayClass}`;

  const wordDelayClasses = ["delay-[650ms]", "delay-[750ms]", "delay-[850ms]"] as const;

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div className="hero-section-aurora" />
      <div className="hero-section-mesh" />
      <div className="hero-section-grid" />

      <div className="glow-orb -top-20 left-[10%] h-[350px] w-[350px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-b left-[55%] top-[40%] h-[250px] w-[250px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-c bottom-[10%] left-[25%] h-[200px] w-[200px] opacity-30 blur-[120px]" />
      <div className="hero-section-beam" />

      <div className="site-shell hero-layout hero-shell">
        <div className="hero-content-stack">
          <div className={`inline-flex duration-700 ${enterClass("delay-[500ms]")}`}>
            <span className="hero-badge cursor-default">{t.hero.badge}</span>
          </div>

          <div className="hero-copy-cluster">
            <h1 className="hero-title">
              {t.hero.words.map((word, i) => (
                <span key={i} className={`block duration-700 ${enterClass(wordDelayClasses[i])}`}>
                  {i === 1 ? <span className="hero-title-accent">{word}</span> : word}
                </span>
              ))}
            </h1>

            <p className={`hero-body duration-700 ${enterClass("delay-[1000ms]")}`}>
              {t.hero.body}
            </p>
          </div>

          <div className={`hero-actions duration-700 ${enterClass("delay-[1150ms]")}`}>
            <ActionLink href="#contact" className="hero-primary-cta">
              {t.hero.primaryCta}
            </ActionLink>
            <ActionLink href="#projects" variant="ghost" className="hero-secondary-cta">
              {t.hero.secondaryCta}
            </ActionLink>
          </div>

          <p className={`hero-support-line duration-700 ${enterClass("delay-[1250ms]")}`}>
            {t.hero.imageLabel}
          </p>
        </div>

        <div
          className={`hero-visual-column duration-[1000ms] ${enterClass("delay-[800ms]")}`}
        >
          <div className="hero-visual-stage">
            <div className="hero-visual-backplate" />
            <div className="hero-visual-ring" />

            <div className="hero-visual-wrap hero-visual-wrap-square mt-2">
              <div className="hero-card-glow absolute inset-[-24px] z-0 rounded-full bg-primary opacity-[0.35] blur-[80px]" />
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
                    fetchPriority="high"
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
