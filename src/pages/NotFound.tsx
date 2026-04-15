import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getLocalizedAlternates, getLocalizedHashPath, getLocalizedNotFoundPath } from "@/lib/locale-routes";
import { usePageSeo } from "@/lib/seo";

const NotFound = () => {
  const { locale, t } = useI18n();

  usePageSeo({
    title: `404 | ${t.notFound.title}`,
    description: t.notFound.body,
    path: getLocalizedNotFoundPath(locale),
    robots: "noindex,nofollow",
    locale,
    alternates: getLocalizedAlternates("/404"),
  });

  return (
    <div className="not-found-shell">
      <div className="not-found-panel">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-title">{t.notFound.title}</p>
        <p className="not-found-copy">{t.notFound.body}</p>
        <Link to={getLocalizedHashPath(locale, "#home")} className="not-found-link">
          {t.notFound.cta}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
