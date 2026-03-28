import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ContactOverlayProvider>
        <Navbar />
        {children}
        <Footer />
      </ContactOverlayProvider>
    </div>
  );
};

export default SiteLayout;
