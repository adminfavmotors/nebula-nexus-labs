import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, isTransitioningLocale, t } = useI18n();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          filter: visible ? "blur(0px)" : "blur(8px)",
          background: scrolled ? "rgba(0, 5, 30, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 89, 255, 0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)" : "none",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
          <div className="logo-wrapper relative cursor-pointer">
            <a href="#home" className="inline-flex items-center">
              <div
                className="font-display text-2xl text-foreground font-extrabold"
                style={{ letterSpacing: "-0.03em" }}
              >
                {siteConfig.brandName}<span className="text-primary">.</span>
              </div>
            </a>
            <span className="logo-orbit-ring" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-pill-link font-body font-bold text-[15px] tracking-[0.04em]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center rounded-full border border-primary/20 bg-white/5 p-1 backdrop-blur-sm"
              aria-label={t.nav.languageLabel}
              style={{
                opacity: isTransitioningLocale ? 0.85 : 1,
                transform: isTransitioningLocale ? "scale(0.985)" : "scale(1)",
                transition: "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {(["pl", "en"] as Locale[]).map((nextLocale) => {
                const isActive = locale === nextLocale;
                return (
                  <button
                    key={nextLocale}
                    type="button"
                    onClick={() => setLocale(nextLocale)}
                    disabled={isTransitioningLocale}
                    className="locale-switch-button rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 disabled:cursor-default"
                    style={{
                      background: isActive ? "#0059ff" : "transparent",
                      color: isActive ? "#ffffff" : "#9db7e6",
                      boxShadow: isActive ? "0 0 12px rgba(0, 89, 255, 0.6)" : "none",
                      transform: isActive ? "translateY(0)" : "translateY(0.5px)",
                    }}
                  >
                    {nextLocale}
                  </button>
                );
              })}
            </div>

            <a
              href="#contact"
              className="btn-primary navbar-cta text-[14px] px-6 py-3 font-bold hidden md:inline-flex"
              style={{ position: "relative", overflow: "hidden" }}
            >
              {t.nav.cta}
            </a>

            <button
              type="button"
              className="flex md:hidden items-center justify-center"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid rgba(0,89,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "50%",
              }}
            >
              {menuOpen ? <X size={16} style={{ color: "#e8f0ff" }} /> : <Menu size={16} style={{ color: "#e8f0ff" }} />}
            </button>
          </div>
        </div>
        <div
          className="navbar-depth-line"
          style={{
            opacity: scrolled ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      </nav>

      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0, 7, 45, 0.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "80px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "260px",
            height: "260px",
            background: "#0059ff",
            filter: "blur(100px)",
            opacity: 0.12,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10">
          {t.nav.links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block font-display font-bold transition-colors duration-300 hover:text-[#2979ff]"
              style={{
                fontSize: "32px",
                color: "#e8f0ff",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(0,89,255,0.1)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-24px)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.07}s`,
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="btn-primary inline-flex justify-center"
            style={{
              width: "100%",
              marginTop: "32px",
              fontSize: "15px",
              paddingTop: "14px",
              paddingBottom: "14px",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(-24px)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + t.nav.links.length * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + t.nav.links.length * 0.07}s`,
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
