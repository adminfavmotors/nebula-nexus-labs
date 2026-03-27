import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default SiteLayout;
