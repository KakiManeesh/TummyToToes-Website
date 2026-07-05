"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto relative flex items-center justify-between h-24 md:h-auto py-0 md:py-2 px-4 md:px-8">

        {/* Left spacer — balances hamburger width on mobile */}
        <div className="md:hidden w-[44px] flex-shrink-0" aria-hidden />

        {/* Logo — single responsive image (avoids duplicate priority fetch) */}
        <a
          href="#home"
          className="absolute left-1/2 -translate-x-1/2 flex items-center md:static md:left-auto md:translate-x-0 h-full justify-start z-10"
          style={{ flexShrink: 0 }}
        >
          <Image
            src="https://res.cloudinary.com/dgcebqgy3/image/upload/v1780254909/Untitled_1500_x_500_px_1500_x_335_px_v6oveg.webp"
            alt="TummyToToes Photography"
            width={288}
            height={80}
            priority
            sizes="288px"
            className="w-[240px] h-[60px] md:w-72 md:h-20 object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href === "/gallery" ? (
              <Link
                key={link.href}
                href="/gallery"
                prefetch={false}
                className="font-body text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="font-body text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => handleClick("#contact")}
            className="font-body text-sm uppercase tracking-[0.15em] border border-foreground text-foreground px-5 py-2 rounded-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Book a Session
          </button>
        </nav>

        {/* Mobile Hamburger — defer Sheet until mounted to avoid hydration mismatch */}
        {mounted ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                aria-label="Menu"
                className="relative z-20 flex items-center justify-end min-w-[44px] min-h-[44px] ml-auto md:hidden"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background w-72 pt-12">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.href === "/gallery" ? (
                    <Link
                      key={link.href}
                      href="/gallery"
                      onClick={() => setOpen(false)}
                      prefetch={false}
                      className="font-body text-lg uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors text-left py-3 px-2"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => handleClick(link.href)}
                      className="font-body text-lg uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors text-left py-3 px-2"
                    >
                      {link.label}
                    </button>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <button
            type="button"
            aria-label="Menu"
            className="relative z-20 md:hidden flex items-center justify-end min-w-[44px] min-h-[44px] ml-auto"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
