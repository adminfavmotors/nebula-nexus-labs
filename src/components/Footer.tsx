import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { legalContent } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site-config";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  const { locale, t } = useI18n();
  const legal = legalContent[locale];
  const resolveSectionHref = (href: string) => `/${href}`;

  return (
    <footer className="footer-shell">
      <div className="site-shell">
        <div className="glow-divider footer-divider-top" />
        <div className="footer-layout">
          <BrandLogo href="/#home" className="footer-brand" />
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
              to="/privacy-policy"
              className="footer-link"
            >
              {legal.footer.privacy}
            </Link>
            <Link
              to="/cookie-policy"
              className="footer-link"
            >
              {legal.footer.cookies}
            </Link>
          </div>
        </div>
        <div className="glow-divider footer-divider-bottom" />
        <p className="footer-copy">
          {"\u00A9"} {siteConfig.currentYear} {siteConfig.brandName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
