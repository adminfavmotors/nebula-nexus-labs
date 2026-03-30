import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/cx";

type BrandLogoProps = {
  href: string;
  className?: string;
};

const BrandLogo = ({ href, className }: BrandLogoProps) => {
  const match = siteConfig.brandName.match(/^(.*?)(\d+)$/);
  const brandPrefix = match?.[1] ?? siteConfig.brandName;
  const brandSuffix = match?.[2] ?? "";

  return (
    <a href={href} className={cx("brand-logo", className)} aria-label={`${siteConfig.brandName} — strona główna`}>
      <span className="brand-logo-name" aria-hidden="true">
        <span className="brand-logo-prefix">{brandPrefix}</span>
        {brandSuffix ? <span className="brand-logo-suffix">{brandSuffix}</span> : null}
      </span>
    </a>
  );
};

export default BrandLogo;
