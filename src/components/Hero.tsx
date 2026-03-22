import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="glow-orb -top-20 left-[10%] h-[350px] w-[350px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-b left-[55%] top-[40%] h-[250px] w-[250px] opacity-30 blur-[120px]" />
      <div className="glow-orb glow-orb-c bottom-[10%] left-[25%] h-[200px] w-[200px] opacity-30 blur-[120px]" />

      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-12 md:pb-20 lg:grid-cols-5">
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

          <p className={`max-w-md font-body text-[15px] font-light leading-[1.7] text-[#7a9acc] duration-700 ${enterClass("delay-[1000ms]")}`}>
            {t.hero.body}
          </p>

          <div className={`flex flex-wrap gap-4 duration-700 ${enterClass("delay-[1150ms]")}`}>
            <a href="#contact" className="btn-primary">
              {t.hero.primaryCta}
            </a>
            <a href="#projects" className="btn-ghost">
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className={`flex items-start justify-center lg:col-span-2 duration-[1000ms] ${enterClass("delay-[800ms]", "translate-y-[30px] scale-95")}`}>
          <div className="relative mt-4 aspect-[4/3] w-full max-w-[480px] isolate animate-[card-float_7.5s_cubic-bezier(0.37,0,0.63,1)_infinite] [backface-visibility:hidden] [contain:layout_paint] [transform-style:preserve-3d]">
            <div className="absolute inset-[-34px] z-0 rounded-full bg-primary opacity-[0.38] blur-[88px] animate-[orb-pulse-a_5s_ease-in-out_infinite]" />

            <div className="relative z-10 size-full overflow-hidden rounded-[20px] shadow-[0_0_72px_rgba(0,89,255,0.45),0_0_150px_rgba(0,89,255,0.22)] [backface-visibility:hidden]">
              <img
                src={workspaceImage}
                alt={t.hero.imageLabel}
                className="block size-full object-cover object-top [backface-visibility:hidden]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,7,45,0.04)_0%,transparent_58%,rgba(0,89,255,0.08)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
