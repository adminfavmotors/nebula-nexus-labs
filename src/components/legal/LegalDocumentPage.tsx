import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-data";
import { getLocalizedHashPath } from "@/lib/locale-routes";
import { legalContent } from "@/lib/legal-content";
import { getLegalPageSeo, type LegalDocumentKey } from "@/lib/seo-routes";
import { usePageSeo } from "@/lib/seo";

type LegalDocumentPageProps = {
  documentKey: LegalDocumentKey;
};

export default function LegalDocumentPage({ documentKey }: LegalDocumentPageProps) {
  const { locale } = useI18n();
  const content = legalContent[locale as Locale];
  const documentContent = content[documentKey];

  usePageSeo(getLegalPageSeo(locale, documentKey));

  return (
    <div className="legal-page">
      <div className="site-shell legal-shell">
        <div className="legal-header">
          <Link
            to={getLocalizedHashPath(locale, "#home")}
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
