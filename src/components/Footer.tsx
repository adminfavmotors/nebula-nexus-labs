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
    <footer className="pb-12 pt-8">
      <div className="site-shell">
        <div className="glow-divider mb-10" />
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <BrandLogo href="/#home" className="justify-center md:justify-start" />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end">
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
        <div className="glow-divider mb-6 mt-10" />
        <p className="text-center font-body text-sm text-muted-foreground">
          {"\u00A9"} {siteConfig.currentYear} {siteConfig.brandName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
