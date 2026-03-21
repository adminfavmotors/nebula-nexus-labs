import { useEffect, useState } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const words = ["Placeholder", "Headline", "Text"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Glow orbs — large, visible */}
      <div className="glow-orb w-[350px] h-[350px] -top-20 left-[10%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />
      <div className="glow-orb glow-orb-b w-[250px] h-[250px] top-[40%] left-[55%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />
      <div className="glow-orb glow-orb-c w-[200px] h-[200px] bottom-[10%] left-[25%]" style={{ opacity: 0.3, filter: "blur(120px)" }} />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center pt-24">
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
            <span className="btn-ghost text-[11px] px-4 py-1.5 tracking-[0.08em] uppercase font-medium cursor-default">
              Placeholder Badge
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-[clamp(48px,6vw,80px)] leading-[1.0] tracking-[-0.03em] text-foreground">
            {words.map((word, i) => (
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
            Placeholder body text goes here. One or two lines of description placeholder content.
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
            <button className="btn-primary">Placeholder CTA</button>
            <button className="btn-ghost">Placeholder Link</button>
          </div>
        </div>

        {/* Right — image placeholder */}
        <div
          className="lg:col-span-2 flex justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}
        >
          <div className="relative w-full aspect-[4/3]">
            <div className="glow-orb w-[180px] h-[180px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.3, filter: "blur(80px)" }} />
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #051650, #0a1f6e)",
                border: "1px solid rgba(0, 89, 255, 0.3)",
                boxShadow: "0 0 80px rgba(0, 89, 255, 0.5)",
              }}
            >
              <span className="absolute bottom-4 left-4 section-label">Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
