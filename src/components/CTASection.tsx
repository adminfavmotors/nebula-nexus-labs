import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, MessageCircle } from "lucide-react";

const CTASection = () => {
  const ref = useScrollReveal(0.15);

  return (
    <section className="section-deep py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left card */}
          <div className="reveal-element card-surface p-10 flex flex-col justify-between min-h-[280px]" data-delay="0">
            <div>
              <span className="section-label block mb-4">KONTAKT</span>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-foreground mb-4 font-bold">
                Placeholder CTA Title
              </h2>
              <p className="font-body font-light text-sm leading-relaxed max-w-sm" style={{ color: "#7a9acc" }}>
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
              background: "#0059ff",
              boxShadow: "0 0 120px rgba(0, 89, 255, 0.5)",
            }}
          >
            <div className="glow-orb w-[200px] h-[200px] -top-10 -right-10" style={{ background: "white", opacity: 0.15, filter: "blur(80px)" }} />
            <div className="relative z-10">
              <h2 className="font-display text-[clamp(24px,3vw,36px)] text-white mb-4 font-bold">
                Placeholder Title
              </h2>
              <p className="font-body font-light text-sm text-white/70 leading-relaxed max-w-sm">
                Placeholder description text.
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-8">
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/20 transition-all duration-300 active:scale-[0.97]">
                <Send size={14} /> Telegram
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/20 transition-all duration-300 active:scale-[0.97]">
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
