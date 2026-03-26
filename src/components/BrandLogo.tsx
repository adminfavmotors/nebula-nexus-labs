import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/cx";

type BrandLogoProps = {
  href: string;
  className?: string;
};

const BrandLogo = ({ href, className }: BrandLogoProps) => {
  return (
    <a href={href} className={cx("brand-logo", className)}>
      <span className="brand-logo-name">{siteConfig.brandName}</span>
      <span className="brand-logo-dot" aria-hidden="true">
        .
      </span>
    </a>
  );
};

export default BrandLogo;
