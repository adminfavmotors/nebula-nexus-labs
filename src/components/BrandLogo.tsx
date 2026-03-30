import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/cx";

type BrandLogoProps = {
  href: string;
  className?: string;
};

const BrandLogo = ({ href, className }: BrandLogoProps) => {
  return (
    <a href={href} className={cx("brand-logo", className)} aria-label={`${siteConfig.brandName} — strona główna`}>
      <img
        src="/brand/node48-logo.png"
        alt={siteConfig.brandName}
        width={512}
        height={512}
        className="brand-logo-image"
        decoding="async"
        fetchpriority="high"
        draggable={false}
      />
    </a>
  );
};

export default BrandLogo;
