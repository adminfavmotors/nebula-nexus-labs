import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/cx";
import { ActionLink } from "@/components/primitives/Actions";
import BrandLogo from "@/components/BrandLogo";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";

const HEADER_REVEAL_OFFSET = 24;
const HEADER_HIDE_OFFSET = 120;
const HEADER_SCROLL_DELTA = 6;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [headerPinned, setHeaderPinned] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const headerPinnedRef = useRef(true);
  const location = useLocation();
  const { locale, setLocale, isTransitioningLocale, t } = useI18n();
  const { openContactOverlay } = useContactOverlay();
  const closeMenu = () => setMenuOpen(false);
  const isHomePage = location.pathname === "/";
  const resolveSectionHref = (href: string) => `/${href}`;
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

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const nextScrolled = currentScrollY > 50;
      let nextPinned = headerPinnedRef.current;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (menuOpen || currentScrollY <= HEADER_REVEAL_OFFSET) {
        nextPinned = true;
      } else if (scrollDelta >= HEADER_SCROLL_DELTA && currentScrollY > HEADER_HIDE_OFFSET) {
        nextPinned = false;
      } else if (scrollDelta <= -HEADER_SCROLL_DELTA) {
        nextPinned = true;
      }

      if (nextPinned !== headerPinnedRef.current) {
        headerPinnedRef.current = nextPinned;
        setHeaderPinned(nextPinned);
      }

      lastScrollY.current = currentScrollY;
      rafId.current = null;
    };

    const onScroll = () => {
      if (rafId.current !== null) {
        return;
      }

      rafId.current = window.requestAnimationFrame(updateHeaderState);
    };

    lastScrollY.current = window.scrollY;
    scrolledRef.current = window.scrollY > 50;
    headerPinnedRef.current = true;
    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);

      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    headerPinnedRef.current = true;
    setHeaderPinned(true);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav
        data-header-visibility={headerPinned ? "visible" : "hidden"}
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-[opacity,transform,filter] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "opacity-100 blur-0" : "opacity-0 blur-[6px]"
        } ${
          headerPinned ? "translate-y-0" : "-translate-y-[calc(100%+1.25rem)]"
        }`}
      >
        <div className={cx("header-panel", scrolled ? "header-panel-scrolled" : "header-panel-idle")}>
          <div className="header-brand-shell">
            <span className="logo-neon-ring" aria-hidden="true" />
            <BrandLogo href="/#home" />
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                to={resolveSectionHref(link.href)}
                className="header-nav-link"
              >
                {link.label}
              </Link>
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
              className="header-mobile-trigger inline-flex lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-panel"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation-panel"
        className={`header-mobile-panel fixed inset-x-0 top-0 z-40 flex h-dvh flex-col justify-start overflow-y-auto px-8 pb-10 pt-24 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-primary/20 blur-[100px]" />

        <div className="relative z-10">
          {t.nav.links.map((link) => (
            <Link
              key={link.href}
              to={resolveSectionHref(link.href)}
              onClick={closeMenu}
              className={`header-mobile-link ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
            >
              {link.label}
            </Link>
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
