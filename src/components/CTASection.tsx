import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, MessageCircle } from "lucide-react";

const CTASection = () => {
  const ref = useScrollReveal(0.15);

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card */}
          <div className="reveal-element card-surface p-10 flex flex-col justify-between min-h-[280px]" data-delay="0">
            <div>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-foreground mb-4">
                Placeholder CTA Title
              </h2>
              <p className="font-body font-light text-sm text-muted-foreground leading-relaxed max-w-sm">
                Placeholder description for the call to action card.
              </p>
            </div>
            <div className="mt-8">
              <button className="btn-primary">Placeholder Button</button>
            </div>
          </div>

          {/* Right card — solid blue */}
          <div
            className="reveal-element rounded-[20px] p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            data-delay="0.15"
            style={{
              background: "hsl(220, 100%, 50%)",
              boxShadow: "0 0 60px hsla(220, 100%, 50%, 0.4)",
            }}
          >
            <div className="glow-orb w-[200px] h-[200px] opacity-30 -top-10 -right-10" style={{ background: "white" }} />
            <div className="relative z-10">
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-primary-foreground mb-4">
                Placeholder Title
              </h2>
              <p className="font-body font-light text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
                Placeholder description text.
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-8">
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-body font-semibold text-sm hover:bg-primary-foreground/20 transition-all duration-300 active:scale-[0.97]">
                <Send size={14} /> Telegram
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-body font-semibold text-sm hover:bg-primary-foreground/20 transition-all duration-300 active:scale-[0.97]">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
