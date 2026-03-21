import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, isTransitioningLocale, t } = useI18n();
  const closeMenu = () => setMenuOpen(false);

  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const nav = navRef.current;
    const target = event.currentTarget;
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();

    setPillStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
    setHoveredLink(href);
  };

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
        className="fixed top-0 left-0 right-0 z-50 relative"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          filter: visible ? "blur(0px)" : "blur(6px)",
          background: scrolled ? "rgba(0, 4, 24, 0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 89, 255, 0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(0,89,255,0.08)" : "none",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
          <div
            className="relative inline-flex items-center cursor-pointer select-none"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <a href="#home" className="inline-flex items-center">
              <svg
                className="logo-orbit-svg"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  inset: "-8px -16px",
                  width: "calc(100% + 32px)",
                  height: "calc(100% + 16px)",
                  opacity: logoHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="36"
                  rx="10"
                  ry="10"
                  fill="none"
                  stroke="url(#orbitGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="40 200"
                  className={logoHovered ? "logo-orbit-dash" : ""}
                  style={{ transformOrigin: "center" }}
                />
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0,89,255,0)" />
                    <stop offset="50%" stopColor="rgba(0,89,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(41,121,255,0)" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-foreground">
                {siteConfig.brandName}
              </span>
              <span
                className="text-primary ml-[1px]"
                style={{
                  transition: "text-shadow 0.3s ease, transform 0.3s ease",
                  display: "inline-block",
                  textShadow: logoHovered ? "0 0 16px rgba(0,89,255,0.9)" : "none",
                  transform: logoHovered ? "scale(1.4)" : "scale(1)",
                }}
              >
                .
              </span>
            </a>
          </div>

          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div
              className="nav-hover-pill"
              style={{
                opacity: hoveredLink ? 1 : 0,
                transform: `translateX(${pillStyle.left}px)`,
                width: `${pillStyle.width}px`,
              }}
            />
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={(event) => handleLinkHover(event, link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative z-10 font-body font-bold text-[15px] tracking-[0.03em] px-4 py-2 rounded-full transition-colors duration-200"
                style={{ color: hoveredLink === link.href ? "#e8f0ff" : "#7a9acc" }}
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
        <div className="navbar-depth-line" />
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
