import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import ContactFormPanel from "@/components/contact/ContactFormPanel";
import { ContactOverlayContext } from "@/components/contact/contact-overlay-context";

const overlayCopy = {
  pl: {
    eyebrow: "Szybki kontakt",
    title: "Opowiedz nam o swoim projekcie",
    body: "Zostaw kilka konkretow. Wrocimy z odpowiedzia tak szybko, jak to mozliwe.",
    closeLabel: "Zamknij okno kontaktowe",
    successTitle: "Wiadomosc wyslana",
    successBody: "Dziekujemy za kontakt. Odezwie sie do Ciebie niedlugo i zyczymy Ci dobrego dnia.",
  },
  en: {
    eyebrow: "Quick contact",
    title: "Tell us about your project",
    body: "Share a few useful details. We will get back to you as soon as possible.",
    closeLabel: "Close contact dialog",
    successTitle: "Message sent",
    successBody: "Thanks for reaching out. We will reply soon and wish you a great day.",
  },
} as const;

type ContactOverlayProviderProps = {
  children: ReactNode;
};

export function ContactOverlayProvider({ children }: ContactOverlayProviderProps) {
  const location = useLocation();
  const { locale } = useI18n();
  const copy = overlayCopy[locale];
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const bannerTimeoutRef = useRef<number | null>(null);

  const closeContactOverlay = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openContactOverlay = useCallback(() => {
    setShowBanner(false);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContactOverlay();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [closeContactOverlay, isOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, []);

  const handleSuccess = useCallback(() => {
    setIsOpen(false);
    setShowBanner(true);

    if (bannerTimeoutRef.current) {
      window.clearTimeout(bannerTimeoutRef.current);
    }

    bannerTimeoutRef.current = window.setTimeout(() => {
      setShowBanner(false);
    }, 4200);
  }, []);

  const value = useMemo(
    () => ({
      openContactOverlay,
      closeContactOverlay,
    }),
    [closeContactOverlay, openContactOverlay],
  );

  return (
    <ContactOverlayContext.Provider value={value}>
      {children}

      {isMounted
        ? createPortal(
            <>
              <div className={`contact-overlay-root ${isOpen ? "contact-overlay-root-open" : ""}`} aria-hidden={!isOpen}>
                <button type="button" className="contact-overlay-backdrop" onClick={closeContactOverlay} aria-label={copy.closeLabel} />

                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="contact-overlay-title"
                  className={`contact-overlay-panel card-neon-border ${isOpen ? "contact-overlay-panel-open" : ""}`}
                >
                  <div className="glow-orb left-[-8%] top-[-6%] h-[180px] w-[180px] opacity-30 blur-[100px]" />
                  <div className="glow-orb glow-orb-b bottom-[-10%] right-[-6%] h-[170px] w-[170px] opacity-30 blur-[100px]" />

                  <div className="contact-overlay-header">
                    <div className="space-y-3">
                      <span className="hero-badge cursor-default">{copy.eyebrow}</span>
                      <h2 id="contact-overlay-title" className="contact-overlay-title">
                        {copy.title}
                      </h2>
                      <p className="contact-overlay-copy">{copy.body}</p>
                    </div>

                    <button
                      type="button"
                      className="contact-overlay-close"
                      onClick={closeContactOverlay}
                      aria-label={copy.closeLabel}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <ContactFormPanel mode="modal" autoFocus={isOpen} onSuccess={handleSuccess} />
                </div>
              </div>

              <div
                className={`contact-success-banner ${showBanner ? "contact-success-banner-open" : ""}`}
                role="status"
                aria-live="polite"
              >
                <div className="contact-success-banner-glow" />
                <p className="contact-success-banner-title">{copy.successTitle}</p>
                <p className="contact-success-banner-copy">{copy.successBody}</p>
              </div>
            </>,
            document.body,
          )
        : null}
    </ContactOverlayContext.Provider>
  );
}
