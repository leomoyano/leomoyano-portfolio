import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  // `language` can be a regional tag such as "es-AR"; compare the resolved one.
  const current = i18n.resolvedLanguage === "en" ? "en" : "es";
  const next = current === "es" ? "en" : "es";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(next)}
      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-2"
      aria-label={next === "en" ? "Switch to English" : "Cambiar a español"}
    >
      <Languages className="w-4 h-4" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tabular-nums">
        {current}
      </span>
    </Button>
  );
}
