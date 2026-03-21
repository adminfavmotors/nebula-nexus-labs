import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref as React.RefObject<HTMLSpanElement>} className="font-display text-[clamp(36px,5vw,64px)] stat-number tracking-tight font-bold">
        {count}<span className="stat-suffix">{suffix}</span>
      </span>
      <p className="font-body font-light text-sm stat-label mt-1">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useScrollReveal(0.15);

  return (
    <section className="section-light py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <span className="reveal-element section-label block mb-4" data-delay="0">O NAS</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] leading-tight font-bold" data-delay="0.05">
            Placeholder bold statement here
          </h2>
          <p className="reveal-element font-body text-[15px] leading-[1.7] body-text self-end" data-delay="0.15">
            Placeholder body paragraph. Short description text goes here. Two to three sentences of placeholder content.
          </p>
        </div>

        <div className="reveal-element flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0" data-delay="0.3">
          <StatItem value={147} suffix="+" label="Placeholder label" />
          <div className="hidden md:block w-px h-16 mx-12 stat-divider" />
          <StatItem value={98} suffix="%" label="Placeholder label" />
          <div className="hidden md:block w-px h-16 mx-12 stat-divider" />
          <StatItem value={12} suffix="" label="Placeholder label" />
        </div>
      </div>
    </section>
  );
};

export default About;
