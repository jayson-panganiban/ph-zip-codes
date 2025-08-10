"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const icons = {
  light: <Sun className="w-5 h-5" />,
  dark: <Moon className="w-5 h-5" />,
  system: <Monitor className="w-5 h-5" />,
};

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.classList.remove("dark");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex gap-2">
        {(["light", "dark", "system"] as Theme[]).map((t) => (
          <Button
            key={t}
            type="button"
            size="icon"
            variant="ghost"
            className="w-10 h-10"
            disabled
          >
            {icons[t]}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/50 backdrop-blur-sm">
      {(["light", "dark", "system"] as Theme[]).map((t) => (
        <Button
          key={t}
          type="button"
          size="icon"
          variant={theme === t ? "default" : "ghost"}
          aria-label={`Switch to ${t} theme`}
          onClick={() => setTheme(t)}
          className={`
            w-10 h-10 transition-all duration-200 
            ${
              theme === t
                ? "bg-primary text-primary-foreground shadow-md scale-105 btn-primary"
                : "hover:bg-muted/60 dark:hover:bg-muted/40"
            }
          `}
        >
          {icons[t]}
        </Button>
      ))}
    </div>
  );
}
