import { useEffect, useState } from "react";

const navLinks = ["Główna", "Usługi", "Projekty", "O nas"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/[0.88] backdrop-blur-[16px] shadow-lg shadow-primary/5" : "bg-transparent"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <div className="font-display text-xl text-foreground tracking-tight">
          logo<span className="text-primary">.</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body font-semibold text-[13px] tracking-[0.06em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <button className="btn-primary text-[13px] px-5 py-2.5 hidden md:inline-flex">
          Placeholder CTA
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
