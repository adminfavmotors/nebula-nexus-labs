const navLinks = ["Główna", "Usługi", "Projekty", "O nas"];

const Footer = () => {
  return (
    <footer className="pb-12 pt-8">
      <div className="container mx-auto px-6">
        <div className="glow-divider mb-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-display text-xl text-foreground tracking-tight">
            logo<span className="text-primary">.</span>
          </div>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="glow-divider mt-10 mb-6" />
        <p className="font-body text-xs text-muted-foreground text-center">
          © 2026 Placeholder. Placeholder rights text.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
