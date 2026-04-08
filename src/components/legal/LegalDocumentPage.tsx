import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-data";
import { legalContent } from "@/lib/legal-content";

type LegalDocumentPageProps = {
  documentKey: "privacy" | "cookies";
};

export default function LegalDocumentPage({ documentKey }: LegalDocumentPageProps) {
  const { locale, t } = useI18n();
  const content = legalContent[locale as Locale];
  const documentContent = content[documentKey];

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    document.title = documentContent.metaTitle;
    metaDescription?.setAttribute("content", documentContent.metaDescription);
    ogTitle?.setAttribute("content", documentContent.metaTitle);
    ogDescription?.setAttribute("content", documentContent.metaDescription);
    twitterTitle?.setAttribute("content", documentContent.metaTitle);
    twitterDescription?.setAttribute("content", documentContent.metaDescription);

    return () => {
      document.title = t.meta.title;
      metaDescription?.setAttribute("content", t.meta.description);
      ogTitle?.setAttribute("content", t.meta.title);
      ogDescription?.setAttribute("content", t.meta.description);
      twitterTitle?.setAttribute("content", t.meta.title);
      twitterDescription?.setAttribute("content", t.meta.description);
    };
  }, [documentContent.metaDescription, documentContent.metaTitle, t.meta.description, t.meta.title]);

  return (
    <div className="legal-page">
      <div className="site-shell legal-shell">
        <div className="legal-header">
          <Link
            to="/"
            className="legal-back-link"
          >
            {content.common.backHome}
          </Link>
          <p className="section-copy-light legal-contact">{content.common.contactLabel}</p>
        </div>

        <div className="legal-panel">
          <div className="legal-doc-shell">
            <p className="legal-meta">
              {content.common.updatedLabel}: {documentContent.updatedAt}
            </p>
            <h1 className="legal-title">
              {documentContent.title}
            </h1>
            <p className="legal-intro">
              {documentContent.intro}
            </p>
          </div>

          <div className="legal-sections">
            {documentContent.sections.map((section) => (
              <section key={section.title} className="legal-section">
                <h2 className="legal-section-heading">
                  {section.title}
                </h2>
                <div className="legal-prose">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="legal-list">
                      {section.items.map((item) => (
                        <li key={item} className="legal-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
