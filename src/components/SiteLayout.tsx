import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default SiteLayout;
