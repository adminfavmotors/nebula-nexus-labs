import { useI18n } from "@/lib/i18n";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound.title}</p>
        <p className="mb-4 text-[0.95rem] leading-7 text-muted-foreground">{t.notFound.body}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t.notFound.cta}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
