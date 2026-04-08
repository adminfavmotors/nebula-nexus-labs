import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
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
const mobileNavigationLabel = {
  pl: "Nawigacja mobilna",
  en: "Mobile navigation",
} as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [headerPinned, setHeaderPinned] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
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
    setMenuOpen(false);
    headerPinnedRef.current = true;
    setHeaderPinned(true);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) {
      return;
    }

    if (menuOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [menuOpen]);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) {
      return;
    }

    const handleClose = () => {
      setMenuOpen(false);
    };

    const handleCancel = () => {
      setMenuOpen(false);
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const dialog = mobileDialogRef.current;
    if (!dialog) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialog.open) {
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
        className={cx(
          "header-root header-shell",
          visible ? "header-shell-visible" : "header-shell-hidden",
          headerPinned ? "header-shell-pinned" : "header-shell-unpinned",
          menuOpen && "header-shell-menu-open",
        )}
      >
        <div className={cx("header-panel", scrolled ? "header-panel-scrolled" : "header-panel-idle")}>
          <div className="header-brand-slot">
            <div className="header-brand-shell">
              <span className="logo-neon-ring" aria-hidden="true" />
              <BrandLogo href="/#home" />
            </div>
          </div>

          <div className="header-desktop-nav">
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

          <div className="header-controls">
            <div
              className={cx(
                "header-locale-shell",
                isTransitioningLocale ? "header-locale-shell-transitioning" : "header-locale-shell-steady",
              )}
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

            <ActionLink href={contactHref} onClick={handleContactClick} className="header-cta header-cta-desktop">
              {t.nav.cta}
            </ActionLink>

            <button
              type="button"
              className="header-mobile-trigger"
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

      <dialog
        ref={mobileDialogRef}
        id="mobile-navigation-panel"
        aria-label={mobileNavigationLabel[locale]}
        className={cx("header-mobile-panel", menuOpen && "header-mobile-panel-open")}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div className="header-mobile-glow" />

        <div className="header-mobile-panel-shell header-mobile-panel-content">
          <div className="header-mobile-topbar">
            <BrandLogo href="/#home" />
            <button
              type="button"
              className="header-mobile-close"
              onClick={closeMenu}
              aria-label={t.nav.closeMenuLabel}
            >
              <X size={18} />
            </button>
          </div>

          {t.nav.links.map((link, index) => (
            <Link
              key={link.href}
              to={resolveSectionHref(link.href)}
              onClick={closeMenu}
              className={cx(
                "header-mobile-link",
                menuOpen ? "header-mobile-link-open" : "header-mobile-link-closed",
              )}
              style={{ "--mobile-link-delay": `${120 + index * 55}ms` } as CSSProperties}
            >
              {link.label}
            </Link>
          ))}

          <ActionLink
            href={contactHref}
            onClick={handleContactClick}
            className={cx(
              "header-mobile-cta header-mobile-cta-base",
              menuOpen ? "header-mobile-cta-open" : "header-mobile-cta-closed",
            )}
            style={{ "--mobile-link-delay": `${120 + t.nav.links.length * 55}ms` } as CSSProperties}
          >
            {t.nav.cta}
          </ActionLink>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
