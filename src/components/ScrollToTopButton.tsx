import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const buttonCopy = {
  pl: "Przewiń do góry",
  en: "Scroll to top",
} as const;

const ScrollToTopButton = () => {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 720);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
