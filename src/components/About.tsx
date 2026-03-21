import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref as React.RefObject<HTMLSpanElement>} className="font-display text-[clamp(36px,5vw,64px)] text-foreground tracking-tight">
        {count}{suffix}
      </span>
      <p className="font-body font-light text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useScrollReveal(0.15);

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] text-foreground leading-tight" data-delay="0">
            Placeholder bold statement here
          </h2>
          <p className="reveal-element font-body font-light text-[15px] leading-[1.7] text-muted-foreground self-end" data-delay="0.15">
            Placeholder body paragraph. Short description text goes here. Two to three sentences of placeholder content.
          </p>
        </div>

        <div className="reveal-element flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0" data-delay="0.3">
          <StatItem value={147} suffix="+" label="Placeholder label" />
          <div className="hidden md:block w-px h-16 mx-12" style={{ background: "linear-gradient(180deg, transparent, hsl(220 100% 50% / 0.4), transparent)" }} />
          <StatItem value={98} suffix="%" label="Placeholder label" />
          <div className="hidden md:block w-px h-16 mx-12" style={{ background: "linear-gradient(180deg, transparent, hsl(220 100% 50% / 0.4), transparent)" }} />
          <StatItem value={12} suffix="" label="Placeholder label" />
        </div>
      </div>
    </section>
  );
};

export default About;
