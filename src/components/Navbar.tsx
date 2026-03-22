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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[opacity,transform,filter,background-color,backdrop-filter,border-color,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100 blur-0" : "-translate-y-5 opacity-0 blur-[6px]"
        } ${
          scrolled
            ? "border-primary/10 bg-[rgba(0,4,24,0.82)] shadow-[0_8px_32px_rgba(0,0,0,0.35),0_1px_0_rgba(0,89,255,0.08)] backdrop-blur-[24px] backdrop-saturate-150"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <a href="#home" className="group relative inline-flex select-none items-center">
            <span className="pointer-events-none absolute inset-[-8px_-16px] overflow-visible opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-[calc(100%+16px)] w-[calc(100%+32px)] overflow-visible">
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
                  className="origin-center group-hover:animate-[orbit-dash_1.8s_linear_infinite]"
                />
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0,89,255,0)" />
                    <stop offset="50%" stopColor="rgba(0,89,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(41,121,255,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-foreground">
              {siteConfig.brandName}
            </span>
            <span className="ml-px inline-block text-primary transition-[text-shadow,transform] duration-300 group-hover:scale-[1.4] group-hover:[text-shadow:0_0_16px_rgba(0,89,255,0.9)]">
              .
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 font-body text-[15px] font-bold tracking-[0.03em] text-[#7a9acc] transition-all duration-200 hover:bg-primary/10 hover:text-[#e8f0ff]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center rounded-full border border-primary/20 bg-white/5 p-1 backdrop-blur-sm transition-[opacity,transform] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
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
                    className={`rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 disabled:cursor-default ${
                      isActive
                        ? "bg-primary text-white shadow-[0_0_12px_rgba(0,89,255,0.6)]"
                        : "translate-y-px bg-transparent text-[#9db7e6] hover:text-[#e8f0ff]"
                    }`}
                  >
                    {nextLocale}
                  </button>
                );
              })}
            </div>

            <a
              href="#contact"
              className="btn-primary navbar-cta relative hidden overflow-hidden px-6 py-3 text-[14px] font-bold md:inline-flex"
            >
              {t.nav.cta}
            </a>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-white/5 text-[#e8f0ff] md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        <div className="navbar-depth-line" />
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[rgba(0,7,45,0.97)] px-8 pt-20 backdrop-blur-[20px] transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-primary/20 blur-[100px]" />

        <div className="relative z-10">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block border-b border-primary/10 py-3 font-display text-[32px] font-bold text-[#e8f0ff] transition-all duration-300 hover:text-[#2979ff] ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className={`btn-primary mt-8 inline-flex w-full justify-center py-3.5 text-[15px] transition-all duration-300 ${
              menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
