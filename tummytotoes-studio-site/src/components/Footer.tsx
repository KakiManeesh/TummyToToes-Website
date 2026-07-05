const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <span className="font-heading text-2xl font-light">TummyToToes</span>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-background/60 mt-1">
              Photography
            </p>
            <p className="font-body text-sm text-background/70 mt-4 leading-relaxed">
              Capturing the fleeting magic of new beginnings — one frame at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-body text-xs uppercase tracking-[0.3em] text-background/60 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-1">
              {["Home", "About", "Gallery", "Packages", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-sm text-background/70 hover:text-background transition-colors py-1.5"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-body text-xs uppercase tracking-[0.3em] text-background/60 mb-4">
              Connect
            </h4>
            <a
              href="mailto:tummytotoes@gmail.com"
              className="block font-body text-sm text-background/70 hover:text-background transition-colors py-1 mb-1"
            >
              tummytotoes@gmail.com
            </a>
            <a
              href="tel:+919966531312"
              className="block font-body text-sm text-background/70 hover:text-background transition-colors py-1 mb-3"
            >
              +91 99665 31312
            </a>
            <div className="flex gap-2 justify-center md:justify-start">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/tummy.to.toes.photography/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-background/60 hover:text-background transition-colors p-2 -ml-2"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center">
          <p className="font-body text-xs text-background/50">
            © 2025 TummytoToes Photography · Made with love
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
