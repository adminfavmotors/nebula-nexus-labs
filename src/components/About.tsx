import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useI18n } from "@/lib/i18n";

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref as React.RefObject<HTMLSpanElement>} className="font-display text-[clamp(36px,5vw,64px)] tracking-tight font-bold text-[#0a0a0a]">
        {count}
        <span className="text-primary">{suffix}</span>
      </span>
      <p className="mt-1 font-body text-sm font-light text-[#4a5568]">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useScrollReveal(0.15);
  const { t } = useI18n();

  return (
    <section id="about" className="section-light section-spacing pt-4 md:pt-6" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <h2 className="section-title-light reveal-element text-[clamp(28px,4vw,44px)]" data-delay="0.05">
            {t.about.titleStart} <span className="text-primary">{t.about.titleAccent}</span> {t.about.titleEnd}
          </h2>
          <div className="flex flex-col gap-3 self-end">
            {t.about.theses.map((item, i) => (
              <div key={i} className="reveal-left" data-delay={String(0.15 + i * 0.15)}>
                <div className="about-thesis-card flex items-start gap-4">
                  <span className="mt-0.5 shrink-0 font-display text-[13px] font-bold tracking-widest text-primary">
                    {item.num}
                  </span>
                  <span className="font-body text-[14px] font-medium leading-relaxed text-[#e8f0ff]">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-element flex flex-col items-center justify-center gap-12 md:flex-row md:gap-0" data-delay="0.3">
          <StatItem {...t.about.stats[0]} />
          <div className="mx-12 hidden h-16 w-px bg-[linear-gradient(180deg,transparent,#c4d0e8,transparent)] md:block" />
          <StatItem {...t.about.stats[1]} />
          <div className="mx-12 hidden h-16 w-px bg-[linear-gradient(180deg,transparent,#c4d0e8,transparent)] md:block" />
          <StatItem {...t.about.stats[2]} />
        </div>
      </div>
    </section>
  );
};

export default About;
