"use client";

import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  label?: string;
  className?: string;
  fallbackUrl?: string;
}

export default function BackButton({
  label = "Back",
  className,
  fallbackUrl = "/",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  }, [router, fallbackUrl]);

  return (
    <button
      type="button"
      onClick={handleBack}
      className={clsx(
        "font-satoshi flex items-center gap-2 text-primary font-regular hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-2 py-4",
        className
      )}
      aria-label={label}
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only md:not-sr-only">{label}</span>
    </button>
  );
}
