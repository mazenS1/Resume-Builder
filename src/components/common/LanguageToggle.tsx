import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppModeStore } from "@/store/appModeStore";
import { useEffect } from "react";

export const LanguageToggle = () => {
  const language = useAppModeStore((state) => state.language);
  const setLanguage = useAppModeStore((state) => state.setLanguage);

  useEffect(() => {
    const root = window.document.documentElement;
    if (language === "ar") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "ar");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", "en");
    }
  }, [language]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="h-9 px-2.5 gap-1.5 font-medium"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm" style={{ fontFamily: language === "en" ? "'IBM Plex Sans Arabic', sans-serif" : "inherit" }}>
        {language === "en" ? "عربي" : "EN"}
      </span>
    </Button>
  );
};
