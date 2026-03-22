import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";

const HowWeWork = () => {
  const ref = useScrollReveal(0.12);
  const { t } = useI18n();

  return (
    <section id="process" className="section-deep section-spacing relative overflow-hidden" ref={ref}>
      <div className="glow-orb right-[10%] top-[20%] h-[200px] w-[200px] opacity-25 blur-[100px]" />
      <div className="glow-orb glow-orb-b bottom-[10%] left-[5%] h-[150px] w-[150px] opacity-25 blur-[80px]" />

      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="section-title-dark reveal-element" data-delay="0.05">
            {t.howWeWork.title}
          </h2>
          <a href="#contact" className="btn-ghost reveal-element px-5 py-2 text-sm" data-delay="0.1">
            {t.howWeWork.link}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.howWeWork.steps.map((step, i) => (
            <div key={i} className="card-surface reveal-element relative p-8" data-delay={String(i * 0.12)}>
              <div className="glow-orb -right-4 -top-4 h-[100px] w-[100px] opacity-25 blur-[60px]" />
              <span className="font-display text-[80px] font-bold leading-none text-white/90">{step.num}</span>
              <h3 className="mt-4 mb-2 font-body font-semibold text-foreground">{step.title}</h3>
              <p className="section-copy-dark">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
