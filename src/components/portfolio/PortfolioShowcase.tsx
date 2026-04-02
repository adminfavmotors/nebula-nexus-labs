import { useI18n } from "@/lib/i18n";
import { getProjectCases } from "@/lib/project-cases";
import PortfolioCarousel from "@/components/portfolio/PortfolioCarousel";

type PortfolioShowcaseProps = {
  collectionLabel: string;
  openLabel: string;
  previousLabel: string;
  nextLabel: string;
};

const PortfolioShowcase = ({
  collectionLabel,
  openLabel,
  previousLabel,
  nextLabel,
}: PortfolioShowcaseProps) => {
  const { locale } = useI18n();
  const items = getProjectCases(locale);

  return (
    <PortfolioCarousel
      items={items}
      collectionLabel={collectionLabel}
      openLabel={openLabel}
      previousLabel={previousLabel}
      nextLabel={nextLabel}
    />
  );
};

export default PortfolioShowcase;
