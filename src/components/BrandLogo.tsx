import { Link } from "react-router-dom";
import { brandName } from "@/lib/site-identity";
import { cx } from "@/lib/cx";

type BrandLogoProps = {
  href: string;
  className?: string;
};

const BrandLogo = ({ href, className }: BrandLogoProps) => {
  const match = brandName.match(/^(.*?)(\d+)$/);
  const brandPrefix = match?.[1] ?? brandName;
  const brandSuffix = match?.[2] ?? "";

  return (
    <Link to={href} className={cx("brand-logo", className)} aria-label={`${brandName} - strona główna`}>
      <span className="brand-logo-name" aria-hidden="true">
        <span className="brand-logo-prefix">{brandPrefix}</span>
        {brandSuffix ? <span className="brand-logo-suffix">{brandSuffix}</span> : null}
      </span>
    </Link>
  );
};

export default BrandLogo;
