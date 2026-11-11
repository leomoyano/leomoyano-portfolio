import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MOTION_OK, gsap, scrollToSection, useGSAP } from "@/lib/motion";

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 40);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");

  const navItems = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const isSpanish = i18n.resolvedLanguage !== "en";
  const menuLabel = isMobileMenuOpen
    ? isSpanish
      ? "Cerrar menú"
      : "Close menu"
    : isSpanish
      ? "Abrir menú"
      : "Open menu";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy: the section crossing the upper-middle of the viewport is active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape and when
  // the viewport grows into the desktop layout.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isMobileMenuOpen]);

  // Reading progress line along the bottom edge of the bar.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          },
        );
      });
    },
    { scope: navRef },
  );

  const goTo = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Background fades in on scroll; only opacity is animated. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[#111827]/70 border-b border-white/[0.08] glass-blur transition-opacity duration-300 ${
            isScrolled && !isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                goTo("#hero");
              }}
              className="text-xl font-bold text-white hover:text-[#3b82f6] transition-colors duration-200"
              aria-label="Leonardo Moyano"
            >
              &lt;LM /&gt;
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === `#${activeId}`;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(item.href);
                    }}
                    className={`relative px-3 lg:px-4 py-2 text-sm transition-colors duration-200 group ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 inset-x-3 lg:inset-x-4 h-0.5 origin-center rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] transition-transform duration-300 ease-out-quint group-hover:scale-x-100 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA Button & Language Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageToggle />
              <Button
                onClick={() => goTo("#contact")}
                className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:opacity-90 text-white font-medium px-6"
              >
                {t("nav.contactBtn")}
              </Button>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="flex items-center gap-1 md:hidden">
              <LanguageToggle />
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center text-white transition-transform duration-150 ease-out active:scale-95"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={menuLabel}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu
                  size={24}
                  aria-hidden="true"
                  className={`absolute transition-[opacity,transform] duration-200 ease-out ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100"
                  }`}
                />
                <X
                  size={24}
                  aria-hidden="true"
                  className={`absolute transition-[opacity,transform] duration-200 ease-out ${
                    isMobileMenuOpen
                      ? "opacity-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-[opacity,visibility] ease-out ${
          isMobileMenuOpen
            ? "opacity-100 visible duration-300"
            : "opacity-0 invisible duration-200"
        }`}
      >
        <div className="absolute inset-0 bg-[#0a0f1c]/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.href === `#${activeId}` ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.href);
              }}
              className={`text-2xl font-medium transition-[opacity,transform,color] duration-300 ease-out-quint ${
                item.href === `#${activeId}` ? "text-[#3b82f6]" : "text-white"
              } ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{
                // Stagger on the way in only; closing should feel instant.
                transitionDelay: isMobileMenuOpen
                  ? `${60 + index * 40}ms`
                  : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
          <Button
            onClick={() => goTo("#contact")}
            className="mt-4 h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:opacity-90 text-white font-medium px-8"
          >
            {t("nav.contactBtn")}
          </Button>
        </div>
      </div>
    </>
  );
}
