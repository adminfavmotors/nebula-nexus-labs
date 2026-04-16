import { useRef, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const SCROLL_TOP_TRIGGER_OFFSET_PX = 720;

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const scrollTopSentinelRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="site-layout-root">
      <div className="site-structural-motion-layer" aria-hidden="true" />
      <div
        ref={scrollTopSentinelRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: `${SCROLL_TOP_TRIGGER_OFFSET_PX}px`,
          width: "1px",
          height: "1px",
          pointerEvents: "none",
        }}
      />
      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton sentinelRef={scrollTopSentinelRef} />
    </div>
  );
};

export default SiteLayout;
