import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);

  return (
    <section className="section-light py-20" ref={ref}>
      <div className="container mx-auto px-6 max-w-2xl">
        <span className="reveal-element section-label block mb-4 text-center" data-delay="0">FORMULARZ</span>
        <h2 className="reveal-element font-display text-[44px] text-foreground text-center mb-10 font-bold" data-delay="0.05">
          Placeholder Contact Title
        </h2>
        <form className="reveal-element space-y-5" data-delay="0.15" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Imię"
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <textarea
            placeholder="Wiadomość"
            rows={5}
            className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300 resize-none"
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
