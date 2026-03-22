import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import workspaceImage from "../../img/20260322_0944_Image Generation_remix_01kmabdvtae9tapkw5dw8pgt9h.png";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Glow orbs — large, visible */}
      <div className="glow-orb w-[350px] h-[350px] -top-20 left-[10%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />
      <div className="glow-orb glow-orb-b w-[250px] h-[250px] top-[40%] left-[55%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />
      <div className="glow-orb glow-orb-c w-[200px] h-[200px] bottom-[10%] left-[25%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center pt-12 pb-16 md:pb-20">
        {/* Left */}
        <div className="lg:col-span-3 space-y-8">
          {/* Badge */}
          <div
            className="inline-flex"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <span className="hero-badge cursor-default">
              {t.hero.badge}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-[clamp(48px,6vw,80px)] leading-[1.0] tracking-[-0.03em] text-foreground">
            {t.hero.words.map((word, i) => (
              <span
                key={i}
                className="block"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.65 + i * 0.1}s`,
                }}
              >
                {i === 1 ? <span style={{ color: "#2979ff" }}>{word}</span> : word}
              </span>
            ))}
          </h1>

          {/* Body */}
          <p
            className="font-body font-light text-[15px] leading-[1.7] max-w-md"
            style={{
              color: "#7a9acc",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 1s",
            }}
          >
            {t.hero.body}
          </p>

          {/* Buttons */}
          <div
            className="flex gap-4 flex-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 1.15s",
            }}
          >
            <a href="#contact" className="btn-primary">
              {t.hero.primaryCta}
            </a>
            <a href="#projects" className="btn-ghost">
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right — image placeholder */}
        <div
          className="lg:col-span-2 flex items-start justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}
        >
          <div
            className="relative w-full"
            style={{
              maxWidth: "480px",
              aspectRatio: "4/3",
              marginTop: "1rem",
              animation: "card-float 7.5s cubic-bezier(0.37, 0, 0.63, 1) infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              transformStyle: "preserve-3d",
              contain: "layout paint",
              isolation: "isolate",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                background: "#0059ff",
                borderRadius: "50%",
                filter: "blur(60px)",
                opacity: 0.2,
                zIndex: 0,
                animation: "orb-pulse-a 5s ease-in-out infinite",
              }}
            />

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(0, 89, 255, 0.3)",
                boxShadow: "0 0 40px rgba(0, 89, 255, 0.3), 0 0 80px rgba(0, 89, 255, 0.12)",
                zIndex: 1,
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={workspaceImage}
                alt="Workspace"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(0,7,45,0.15) 0%, transparent 60%, rgba(0,89,255,0.08) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
