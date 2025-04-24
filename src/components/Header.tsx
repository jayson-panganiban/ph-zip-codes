"use client";

import ThemeSelector from "@/components/ThemeSelector";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur">
      {/* Home / logo */}
      <Link
        href="/"
        aria-label="Go to home page"
        className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <HomeIcon className="h-6 w-6" />
        {/* Visually hidden text for screen readers */}
        <span className="sr-only">Home</span>
      </Link>

      {/* Theme switcher */}
      <ThemeSelector />
    </header>
  );
}
