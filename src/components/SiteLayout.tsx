import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="site-layout-root">
      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default SiteLayout;
