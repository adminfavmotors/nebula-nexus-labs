import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { ActionLink } from "@/components/primitives/Actions";
import workspaceImage from "../../img/20260322_0944_Image Generation_remix_01kmabdvtae9tapkw5dw8pgt9h.png";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  const enterClass = (delayClass: string, hiddenClass = "translate-y-5") =>
    `transition-all [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${delayClass} ${
      loaded ? "translate-y-0 opacity-100" : `${hiddenClass} opacity-0`
    }`;

  const wordDelayClasses = ["delay-[650ms]", "delay-[750ms]", "delay-[850ms]"] as const;

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div className="glow-orb -top-20 left-[10%] h-[350px] w-[350px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-b left-[55%] top-[40%] h-[250px] w-[250px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-c bottom-[10%] left-[25%] h-[200px] w-[200px] opacity-30 blur-[120px]" />

      <div className="site-shell grid grid-cols-1 items-center gap-14 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          <div className={`inline-flex duration-700 ${enterClass("delay-[500ms]")}`}>
            <span className="hero-badge cursor-default">{t.hero.badge}</span>
          </div>

          <h1 className="font-display text-[clamp(48px,6vw,80px)] leading-[1] tracking-[-0.03em] text-foreground">
            {t.hero.words.map((word, i) => (
              <span key={i} className={`block duration-700 ${enterClass(wordDelayClasses[i], "translate-y-[30px]")}`}>
                {i === 1 ? <span className="text-[#2979ff]">{word}</span> : word}
              </span>
            ))}
          </h1>

          <p className={`section-copy-dark max-w-md duration-700 ${enterClass("delay-[1000ms]")}`}>
            {t.hero.body}
          </p>

          <div className={`flex flex-wrap gap-4 duration-700 ${enterClass("delay-[1150ms]")}`}>
            <ActionLink href="#contact">
              {t.hero.primaryCta}
            </ActionLink>
            <ActionLink href="#projects" variant="ghost">
              {t.hero.secondaryCta}
            </ActionLink>
          </div>
        </div>

        <div className={`flex items-start justify-center lg:col-span-2 duration-[1000ms] ${enterClass("delay-[800ms]", "translate-y-[30px] scale-[0.96]")}`}>
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
                  alt={t.hero.imageLabel}
                  className="hero-visual-image"
                />
                <div className="hero-visual-sheen" />
                <div className="hero-visual-vignette" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
