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
    <div className="min-h-screen bg-[#f5f7ff] text-[#0a0a0a]">
      <div className="site-shell py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-[#d7e2f8] bg-white px-4 py-2 font-body text-sm font-medium text-[#0a0a0a] transition-colors duration-300 hover:border-[#0059ff] hover:text-[#0059ff]"
          >
            {content.common.backHome}
          </Link>
          <p className="section-copy-light">{content.common.contactLabel}</p>
        </div>

        <div className="rounded-[28px] border border-[#dbe6fb] bg-white p-6 shadow-[0_24px_80px_rgba(0,89,255,0.08)] md:p-10">
          <div className="max-w-[42rem]">
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-[0.18em] text-[#0059ff]">
              {content.common.updatedLabel}: {documentContent.updatedAt}
            </p>
            <h1 className="font-display text-[clamp(34px,5vw,56px)] leading-[1.02] tracking-[-0.04em] text-[#0a0a0a]">
              {documentContent.title}
            </h1>
            <p className="section-copy-light measure-copy-wide mt-5">
              {documentContent.intro}
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {documentContent.sections.map((section) => (
              <section key={section.title} className="max-w-[42rem] border-t border-[#ecf1fb] pt-6 first:border-t-0 first:pt-0">
                <h2 className="font-display text-[clamp(22px,3vw,30px)] leading-[1.1] tracking-[-0.03em] text-[#0a0a0a]">
                  {section.title}
                </h2>
                <div className="measure-copy-wide mt-4 space-y-4 font-body text-[0.98rem] leading-[1.82] text-[#334155]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="space-y-2 pl-5 text-[#334155]">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc">
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
