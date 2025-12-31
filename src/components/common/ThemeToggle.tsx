import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppModeStore } from "@/store/appModeStore";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const darkMode = useAppModeStore((state) => state.darkMode);
  const setDarkMode = useAppModeStore((state) => state.setDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setDarkMode(!darkMode)}
      className="h-9 w-9 p-0"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
