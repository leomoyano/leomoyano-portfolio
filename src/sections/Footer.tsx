import { Heart, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion, scrollToSection } from "@/lib/motion";

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative py-12 border-t border-[#1e293b] overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="orb orb-blue bottom-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[300px] [--orb-alpha:0.08]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center lg:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="text-2xl font-bold text-white hover:text-gradient transition-colors inline-block mb-2"
            >
              &lt;Leonardo Moyano /&gt;
            </a>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t("footer.role")}
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top & Made with */}
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="text-sm text-gray-400 flex items-center gap-1">
              {t("footer.madeWith")}{" "}
              <Heart
                className="w-4 h-4 text-red-500 fill-red-500"
                aria-hidden="true"
              />{" "}
              {t("footer.and")} {t("footer.coffee")}
            </p>
            <button
              onClick={scrollToTop}
              type="button"
              className="group w-11 h-11 flex-shrink-0 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 active:scale-95 transition-[color,background-color,transform] duration-200 ease-out-quint"
              aria-label={t("footer.backToTop")}
            >
              <ArrowUp
                className="w-5 h-5 transition-transform duration-200 ease-out-quint group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
