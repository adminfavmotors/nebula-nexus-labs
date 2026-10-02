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
import { usePageScrollLock } from "@/lib/page-scroll-lock";

const overlayCopy = {
  pl: {
    eyebrow: "Szybki kontakt",
    title: "Opowiedz nam o swoim projekcie",
    body: "Zostaw kilka konkretów. Wrócimy z odpowiedzią tak szybko, jak to możliwe.",
    closeLabel: "Zamknij okno kontaktowe",
    successTitle: "Wiadomość wysłana",
    successBody: "Dziękujemy za kontakt. Odezwiemy się niedługo i życzymy Ci dobrego dnia.",
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPointerDownRef = useRef(false);
  const bannerTimeoutRef = useRef<number | null>(null);

  usePageScrollLock(isOpen);

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
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      // Native modality makes the page inert and remembers the opening control.
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isMounted, isOpen]);

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
              <dialog
                ref={dialogRef}
                className="contact-overlay-root"
                aria-labelledby="contact-overlay-title"
                onCancel={(event) => {
                  event.preventDefault();
                  closeContactOverlay();
                }}
                onClose={(event) => {
                  // A queued close event must not close an already reopened dialog.
                  if (!event.currentTarget.open) {
                    closeContactOverlay();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Tab") {
                    return;
                  }
                  // Keep the keyboard cycle inside the dialog, including its boundaries.
                  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
                    'a[href], button, input, textarea, select, [tabindex]',
                  )).filter((control) => control.tabIndex >= 0 && !control.matches(":disabled") && control.getClientRects().length > 0);
                  const first = controls[0];
                  const last = controls[controls.length - 1];
                  if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                  } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                  }
                }}
                onPointerDown={(event) => {
                  backdropPointerDownRef.current = event.target === event.currentTarget;
                }}
                onClick={(event) => {
                  if (backdropPointerDownRef.current && event.target === event.currentTarget) {
                    closeContactOverlay();
                  }
                  backdropPointerDownRef.current = false;
                }}
              >
                <div
                  className={`contact-overlay-panel neon-frame-soft ${isOpen ? "contact-overlay-panel-open" : ""}`}
                >
                  <div className="contact-overlay-content-stack">
                    <div className="contact-overlay-header">
                      <div className="contact-overlay-copy-cluster">
                        <span className="hero-badge contact-overlay-eyebrow">{copy.eyebrow}</span>
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
                        <X size={18} aria-hidden="true" />
                      </button>
                    </div>
                    <ContactFormPanel className="contact-overlay-form" mode="modal" onSuccess={handleSuccess} />
                  </div>
                </div>
              </dialog>

              <div
                className={`contact-success-banner ${showBanner ? "contact-success-banner-open" : ""}`}
                role="status"
                aria-live="polite"
                aria-hidden={!showBanner}
                hidden={!showBanner}
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
