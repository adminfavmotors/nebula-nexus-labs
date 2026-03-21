import { useEffect, useState } from "react";
import { useI18n, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        background: scrolled ? "rgba(0, 7, 45, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 89, 255, 0.05)" : "none",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <div className="font-display text-xl text-foreground tracking-tight">
          {siteConfig.brandName}<span className="text-primary">.</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body font-semibold text-[13px] tracking-[0.06em] hover:text-foreground transition-colors duration-300"
              style={{ color: "#7a9acc" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center rounded-full border border-primary/20 bg-white/5 p-1 backdrop-blur-sm"
            aria-label={t.nav.languageLabel}
          >
            {(["pl", "en"] as Locale[]).map((nextLocale) => {
              const isActive = locale === nextLocale;
              return (
                <button
                  key={nextLocale}
                  type="button"
                  onClick={() => setLocale(nextLocale)}
                  className="rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
                  style={{
                    background: isActive ? "#0059ff" : "transparent",
                    color: isActive ? "#ffffff" : "#9db7e6",
                  }}
                >
                  {nextLocale}
                </button>
              );
            })}
          </div>

          <a href="#contact" className="btn-primary text-[13px] px-5 py-2.5 hidden md:inline-flex">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
