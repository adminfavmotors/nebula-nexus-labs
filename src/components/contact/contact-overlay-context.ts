import { createContext, useContext } from "react";

type ContactOverlayContextValue = {
  openContactOverlay: () => void;
  closeContactOverlay: () => void;
};

export const ContactOverlayContext = createContext<ContactOverlayContextValue | null>(null);

export function useContactOverlay() {
  const context = useContext(ContactOverlayContext);

  if (!context) {
    throw new Error("useContactOverlay must be used within ContactOverlayProvider");
  }

  return context;
}
