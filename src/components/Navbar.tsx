import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/cx";
import { ActionLink } from "@/components/primitives/Actions";
import BrandLogo from "@/components/BrandLogo";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const location = useLocation();
  const { locale, setLocale, isTransitioningLocale, t } = useI18n();
  const { openContactOverlay } = useContactOverlay();
  const closeMenu = () => setMenuOpen(false);
  const isHomePage = location.pathname === "/";
  const resolveSectionHref = (href: string) => (isHomePage ? href : `/${href}`);
  const contactHref = isHomePage ? "#contact" : "/#contact";

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();
    openContactOverlay();
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
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-[opacity,transform,filter] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100 blur-0" : "-translate-y-5 opacity-0 blur-[6px]"
        }`}
      >
        <div className={cx("header-panel", scrolled ? "header-panel-scrolled" : "header-panel-idle")}>
          <div
            style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <span
              className={cx("logo-neon-ring", logoHovered && "logo-hovered")}
              style={{
                position: "absolute",
                inset: "-6px -14px",
                borderRadius: "12px",
                pointerEvents: "none",
                opacity: logoHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            <BrandLogo href={isHomePage ? "#home" : "/#home"} className="header-brand" />
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={resolveSectionHref(link.href)}
                className="header-nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`header-locale-shell ${
                isTransitioningLocale ? "scale-[0.985] opacity-[0.85]" : "scale-100 opacity-100"
              }`}
              aria-label={t.nav.languageLabel}
            >
              {(["pl", "en"] as Locale[]).map((nextLocale) => {
                const isActive = locale === nextLocale;
                return (
                  <button
                    key={nextLocale}
                    type="button"
                    onClick={() => setLocale(nextLocale)}
                    disabled={isTransitioningLocale}
                    className={cx("header-locale-button", isActive ? "header-locale-button-active" : "header-locale-button-idle")}
                  >
                    {nextLocale}
                  </button>
                );
              })}
            </div>

            <ActionLink href={contactHref} onClick={handleContactClick} className="header-cta hidden md:inline-flex">
              {t.nav.cta}
            </ActionLink>

            <button
              type="button"
              className="header-mobile-trigger lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`header-mobile-panel fixed inset-0 z-40 flex flex-col justify-center px-8 pt-24 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-primary/20 blur-[100px]" />

        <div className="relative z-10">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={resolveSectionHref(link.href)}
              onClick={closeMenu}
              className={`header-mobile-link ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}

          <ActionLink
            href={contactHref}
            onClick={handleContactClick}
            className={`mt-8 inline-flex w-full justify-center py-3.5 text-[15px] transition-all duration-300 ${
              menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            {t.nav.cta}
          </ActionLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
