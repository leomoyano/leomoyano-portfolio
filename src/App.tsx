import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "@/lib/motion";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "es";

  useEffect(() => {
    // Keep the document language in sync for assistive tech and hyphenation.
    document.documentElement.lang = language;
    // index.html ships the Spanish defaults; mirror the active locale here.
    document.title = t("meta.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("meta.description"));
    // Copy length differs per language, so trigger positions must be remeasured.
    ScrollTrigger.refresh();
  }, [language, t]);

  useEffect(() => {
    // Late-loading fonts and images shift the layout after the first measure.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0f1c]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100] focus:rounded-lg focus:bg-[#111827] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {language === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      {/* Noise overlay for texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navigation />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
