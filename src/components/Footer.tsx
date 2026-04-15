import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { legalUiCopy } from "@/lib/legal-ui";
import { getLocalizedHashPath, getLocalizedLegalPath } from "@/lib/locale-routes";
import { brandName, currentYear } from "@/lib/site-identity";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  const { locale, t } = useI18n();
  const legal = legalUiCopy[locale];
  const resolveSectionHref = (href: string) => getLocalizedHashPath(locale, href);

  return (
    <footer className="footer-shell">
      <div className="site-shell">
        <div className="glow-divider footer-divider-top" />
        <div className="footer-layout">
          <BrandLogo href={getLocalizedHashPath(locale, "#home")} className="footer-brand" />
          <div className="footer-links-shell">
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                to={resolveSectionHref(link.href)}
                className="footer-link"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={getLocalizedLegalPath(locale, "privacy")}
              className="footer-link"
            >
              {legal.footer.privacy}
            </Link>
            <Link
              to={getLocalizedLegalPath(locale, "cookies")}
              className="footer-link"
            >
              {legal.footer.cookies}
            </Link>
          </div>
        </div>
        <div className="glow-divider footer-divider-bottom" />
        <p className="footer-copy">
          {"\u00A9"} {currentYear} {brandName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
