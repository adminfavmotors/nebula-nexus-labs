import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();

  return (
    <section id="about" className="section-light py-8 md:py-10" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] leading-tight font-bold" data-delay="0.05">
            {t.about.title}
          </h2>
          <p className="reveal-element font-body text-[15px] leading-[1.7] body-text self-end" data-delay="0.15">
            {t.about.body}
          </p>
        </div>

        <div className="reveal-element flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0" data-delay="0.3">
          <StatItem {...t.about.stats[0]} />
          <div className="hidden md:block w-px h-16 mx-12 stat-divider" />
          <StatItem {...t.about.stats[1]} />
          <div className="hidden md:block w-px h-16 mx-12 stat-divider" />
          <StatItem {...t.about.stats[2]} />
        </div>
      </div>
    </section>
  );
};

export default About;
