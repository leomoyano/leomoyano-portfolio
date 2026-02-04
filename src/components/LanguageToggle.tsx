import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-bold uppercase">{i18n.language}</span>
    </Button>
  );
}
