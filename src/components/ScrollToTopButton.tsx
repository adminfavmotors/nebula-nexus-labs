import { useEffect, useState, type RefObject } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const buttonCopy = {
  pl: "Przewiń do góry",
  en: "Scroll to top",
} as const;

type ScrollToTopButtonProps = {
  sentinelRef: RefObject<Element | null>;
};

const ScrollToTopButton = ({ sentinelRef }: ScrollToTopButtonProps) => {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        {
          threshold: 0,
        },
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 720);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sentinelRef]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={buttonCopy[locale]}
      className={`scroll-top-button ${visible ? "scroll-top-button-visible" : ""}`}
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTopButton;
