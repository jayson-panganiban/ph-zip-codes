"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface BackToTopProps {
  /** Show after scrolling this many pixels (default: 300) */
  showAfter?: number;
  /** Optional: className for positioning (default: bottom-6 right-6) */
  className?: string;
  /** Optional: aria-label for accessibility */
  ariaLabel?: string;
}

export default function BackToTop({
  showAfter = 300,
  className = "fixed bottom-6 right-6 z-40",
  ariaLabel = "Back to top",
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  if (!visible) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant="default"
      className={`${className} rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition`}
      aria-label={ariaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
}
