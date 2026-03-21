import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { num: "01.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "02.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "03.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
  { num: "04.", title: "Placeholder Step", desc: "Placeholder sentence describing this step." },
];

const HowWeWork = () => {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[200px] h-[200px] opacity-15 top-[20%] right-[10%]" />
      <div className="glow-orb w-[150px] h-[150px] opacity-20 bottom-[10%] left-[5%]" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-4">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] text-foreground" data-delay="0">
            Placeholder Title
          </h2>
          <a href="#" className="reveal-element btn-ghost text-sm px-5 py-2" data-delay="0.1">
            Placeholder Link →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal-element card-surface p-8 relative"
              data-delay={String(i * 0.1)}
            >
              <div className="glow-orb w-[80px] h-[80px] opacity-15 -top-4 -right-4" />
              <span className="font-display text-[48px] text-primary/30 leading-none">{step.num}</span>
              <h3 className="font-body font-semibold text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="font-body font-light text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
