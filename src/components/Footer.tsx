import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { legalContent } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site-config";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  const { locale, t } = useI18n();
  const legal = legalContent[locale];

  return (
    <footer className="pb-12 pt-8">
      <div className="container mx-auto px-6">
        <div className="glow-divider mb-10" />
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <BrandLogo href="/#home" />
          <div className="flex flex-wrap items-center justify-center gap-6">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/privacy-policy"
              className="font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {legal.footer.privacy}
            </Link>
            <Link
              to="/cookie-policy"
              className="font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {legal.footer.cookies}
            </Link>
          </div>
        </div>
        <div className="glow-divider mb-6 mt-10" />
        <p className="text-center font-body text-xs text-muted-foreground">
          {"\u00A9"} {siteConfig.currentYear} {siteConfig.brandName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
