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
  const theses = [
    { num: "01.", text: "Strona to narzędzie sprzedaży, nie tylko wizytówka." },
    { num: "02.", text: "Pomagamy rosnąć firmom, które chcą być zauważone." },
    { num: "03.", text: "Od strategii po wdrożenie, z myślą o Twoim wyniku." },
  ];

  return (
    <section id="about" className="section-light pt-4 md:pt-6 pb-8 md:pb-10" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] leading-tight font-bold" data-delay="0.05">
            {t.about.titleStart} <span style={{ color: "#0059ff" }}>{t.about.titleAccent}</span> {t.about.titleEnd}
          </h2>
          <div className="flex flex-col gap-3 self-end">
            {theses.map((item, i) => (
              <div
                key={i}
                className="reveal-left"
                data-delay={String(0.15 + i * 0.15)}
              >
                <div
                  className="flex items-start gap-4 px-5 py-4 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #051650, #0d2472)",
                    border: "1px solid rgba(0, 89, 255, 0.2)",
                    boxShadow: "0 4px 24px rgba(0, 89, 255, 0.1)",
                  }}
                >
                  <span
                    className="font-display font-bold text-[13px] tracking-widest shrink-0 mt-0.5"
                    style={{ color: "#0059ff" }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-body font-medium text-[14px] leading-relaxed"
                    style={{ color: "#e8f0ff" }}
                  >
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
