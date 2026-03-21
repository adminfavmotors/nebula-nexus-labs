import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { num: "01.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "02.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "03.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "04.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
];

const HowWeWork = () => {
  const ref = useScrollReveal(0.12);

  return (
    <section className="section-deep py-20 relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[200px] h-[200px] top-[20%] right-[10%]" style={{ opacity: 0.25, filter: "blur(100px)" }} />
      <div className="glow-orb glow-orb-b w-[150px] h-[150px] bottom-[10%] left-[5%]" style={{ opacity: 0.25, filter: "blur(80px)" }} />

      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="reveal-element section-label block mb-4" data-delay="0">JAK PRACUJEMY</span>
            <h2 className="reveal-element font-display text-[44px] text-foreground font-bold" data-delay="0.05">
              Placeholder Title
            </h2>
          </div>
          <a href="#" className="reveal-element btn-ghost text-sm px-5 py-2" data-delay="0.1">
            Placeholder Link →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal-element card-surface p-8 relative"
              data-delay={String(i * 0.12)}
            >
              <div className="glow-orb w-[100px] h-[100px] -top-4 -right-4" style={{ opacity: 0.25, filter: "blur(60px)" }} />
              <span className="font-display text-[72px] text-white leading-none font-bold">{step.num}</span>
              <h3 className="font-body font-semibold text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#7a9acc" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
