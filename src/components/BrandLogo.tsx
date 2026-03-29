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
    <a href={href} className={cx("brand-logo", className)}>
      <span className="brand-logo-wave" aria-hidden="true">
        <svg viewBox="0 0 124 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 27.5C15.6 27.5 19.1 10 31.5 10C43.9 10 47.1 27.5 59.5 27.5C71.9 27.5 75.1 10 87.5 10C99.9 10 103.4 27.5 121 27.5"
            className="brand-logo-wave-core"
          />
          <path
            d="M8 31C20.2 31 23.9 14.5 36 14.5C48.1 14.5 51.9 31 64 31C76.1 31 79.9 14.5 92 14.5C104.1 14.5 107.8 31 118 31"
            className="brand-logo-wave-trace"
          />
        </svg>
      </span>

      <span className="brand-logo-name">
        <span className="brand-logo-prefix">{brandPrefix}</span>
        {brandSuffix ? <span className="brand-logo-suffix">{brandSuffix}</span> : null}
      </span>
    </a>
  );
};

export default BrandLogo;
