import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] text-foreground text-center mb-12" data-delay="0">
          Placeholder Contact Title
        </h2>
        <form className="reveal-element space-y-6" data-delay="0.15" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Imię"
              className="w-full px-5 py-3.5 rounded-xl bg-surface border border-primary/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3.5 rounded-xl bg-surface border border-primary/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
          <textarea
            placeholder="Wiadomość"
            rows={5}
            className="w-full px-5 py-3.5 rounded-xl bg-surface border border-primary/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
          />
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Placeholder Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
