import { useI18n } from "@/lib/i18n";
import { usePageSeo } from "@/lib/seo";

const NotFound = () => {
  const { t } = useI18n();

  usePageSeo({
    title: `404 | ${t.notFound.title}`,
    description: t.notFound.body,
    path: "/404",
    robots: "noindex,nofollow",
  });

  return (
    <div className="not-found-shell">
      <div className="not-found-panel">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-title">{t.notFound.title}</p>
        <p className="not-found-copy">{t.notFound.body}</p>
        <a href="/" className="not-found-link">
          {t.notFound.cta}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
