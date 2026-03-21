import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const services = [
  { num: "01", name: "Placeholder Service", price: "od 2 500 PLN" },
  { num: "02", name: "Placeholder Service", price: "od 4 000 PLN" },
  { num: "03", name: "Placeholder Service", price: "od 1 800 PLN" },
  { num: "04", name: "Placeholder Service", price: "od 3 200 PLN" },
  { num: "05", name: "Placeholder Service", price: "od 5 000 PLN" },
];

const Services = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] text-foreground mb-16" data-delay="0">
          Placeholder Title
        </h2>

        <div className="space-y-0">
          {services.map((s, i) => (
            <div key={i}>
              <div className="glow-divider" />
              <div
                className="reveal-left group flex items-center gap-6 py-6 px-4 -mx-4 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-primary/[0.04]"
                data-delay={String(i * 0.08)}
              >
                <div className="icon-circle group-hover:bg-primary/20 group-hover:border-primary/40">
                  <span className="font-display text-sm text-primary">{s.num}</span>
                </div>

                <span className="font-body font-semibold text-foreground flex-1">{s.name}</span>
                <span className="font-body text-sm text-muted-foreground hidden sm:block">{s.price}</span>

                <div className="icon-circle group-hover:bg-primary group-hover:shadow-[0_0_16px_hsla(220,100%,50%,0.4)]">
                  <ArrowRight size={16} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
          <div className="glow-divider" />
        </div>
      </div>
    </section>
  );
};

export default Services;
